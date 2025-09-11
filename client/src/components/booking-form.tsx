import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

interface Route {
  id: string;
  name: string;
  displayName: string;
  vehicleType: string;
  duration: string;
  couplePrice?: string;
  individualPrice?: string;
  xdsPrice?: string;
  x3Price?: string;
  trochaType?: string;
  description: string;
  includes: string[];
}

interface BookingData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  routeId: string;
  vehicleType: string;
  isCouple: boolean;
  bookingDate: string;
  totalPrice: string;
  depositAmount: string;
  includesVideo: boolean;
  videoPrice?: string;
  notes: string;
  whatsappMessage: string;
}

export default function BookingForm() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState<string>("");
  const [selectedBuggyModel, setSelectedBuggyModel] = useState<string>("xds");
  const [isCouple, setIsCouple] = useState(false);
  const [includesVideo, setIncludesVideo] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [availability, setAvailability] = useState<any>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    notes: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [location] = useLocation();

  // Fetch routes
  const { data: routes = [] } = useQuery({
    queryKey: ['/api/routes'],
    queryFn: async () => {
      const response = await fetch('/api/routes');
      if (!response.ok) throw new Error('Failed to fetch routes');
      return response.json();
    }
  });

  // Check availability mutation
  const checkAvailabilityMutation = useMutation({
    mutationFn: async (date: string) => {
      const response = await fetch('/api/availability/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date })
      });
      if (!response.ok) throw new Error('Failed to check availability');
      return response.json();
    },
    onSuccess: (data) => {
      setAvailability(data);
    }
  });

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (booking: BookingData) => {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      if (!response.ok) throw new Error('Failed to create booking');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Reserva creada!",
        description: "Tu reserva ha sido enviada. Te contactaremos por WhatsApp para confirmar el anticipo.",
      });
      // Reset form
      setSelectedRoute(null);
      setSelectedVehicleCategory("");
      setSelectedBuggyModel("xds");
      setIsCouple(false);
      setIncludesVideo(false);
      setSelectedDate("");
      setFormData({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        notes: ""
      });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo crear la reserva. Intenta de nuevo.",
        variant: "destructive"
      });
    }
  });

  // Calculate total price
  const calculatePrice = () => {
    if (!selectedRoute) return 0;
    
    let basePrice = 0;
    
    if (selectedRoute.vehicleType === 'cuatrimoto') {
      basePrice = parseFloat(isCouple ? selectedRoute.couplePrice || '0' : selectedRoute.individualPrice || '0');
    } else if (selectedBuggyModel === 'x3') {
      basePrice = parseFloat(selectedRoute.x3Price || '0');
    } else {
      basePrice = parseFloat(selectedRoute.xdsPrice || '0');
    }
    
    const videoPrice = includesVideo ? 50000 : 0;
    return basePrice + videoPrice;
  };

  // Calculate deposit
  const calculateDeposit = () => {
    if (!selectedRoute) return 0;
    return selectedRoute.vehicleType === 'cuatrimoto' ? 100000 : 200000;
  };

  // Check availability when date changes
  useEffect(() => {
    if (selectedDate) {
      checkAvailabilityMutation.mutate(selectedDate);
    }
  }, [selectedDate]);

  // Handle URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleParam = urlParams.get('vehicle');
    const routeIdParam = urlParams.get('routeId');
    
    if (vehicleParam && routes.length > 0) {
      // Map vehicle parameter to category
      const vehicleCategory = vehicleParam === 'cuatrimoto' ? 'cuatrimoto' : 
                             vehicleParam === 'buggy' ? 'buggy' : 
                             vehicleParam === 'trocha' ? 'trocha' : '';
      
      if (vehicleCategory) {
        setSelectedVehicleCategory(vehicleCategory);
        
        // If routeId is provided, find and select the route
        if (routeIdParam) {
          const route = routes.find((r: Route) => r.id === routeIdParam);
          if (route) {
            setSelectedRoute(route);
            // Scroll to form with a slight delay
            setTimeout(() => {
              const formElement = document.getElementById('reservar');
              if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
              }
            }, 500);
          }
        }
      }
    }
  }, [routes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoute || !selectedDate || !formData.customerName || !formData.customerPhone) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive"
      });
      return;
    }

    if (!availability?.isAvailable) {
      toast({
        title: "Fecha no disponible",
        description: "La fecha seleccionada no está disponible. Elige otra fecha.",
        variant: "destructive"
      });
      return;
    }

    const totalPrice = calculatePrice();
    const depositAmount = calculateDeposit();
    const vehicleType = selectedRoute.vehicleType === 'cuatrimoto' ? 'cuatrimoto' : 
      selectedRoute.name === 'trocha_vip' ? 'trocha_vip' : 
      selectedBuggyModel === 'x3' ? 'buggy_x3' : 'buggy_xds';

    const whatsappMessage = `¡Hola! Quiero confirmar mi reserva:
📅 Fecha: ${selectedDate}
🏍️ Ruta: ${selectedRoute.displayName}
🚗 Vehículo: ${vehicleType === 'buggy_x3' ? 'Buggy X3' : vehicleType === 'buggy_xds' ? 'Buggy XDS' : 'Cuatrimoto'}
👥 ${isCouple ? 'Pareja' : 'Individual'}
${includesVideo ? '🎥 Con video profesional' : ''}
💰 Total: $${totalPrice.toLocaleString()}
💳 Anticipo: $${depositAmount.toLocaleString()}
👤 ${formData.customerName}
📱 ${formData.customerPhone}`;

    const bookingData: BookingData = {
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      routeId: selectedRoute.id,
      vehicleType,
      isCouple,
      bookingDate: selectedDate,
      totalPrice: totalPrice.toString(),
      depositAmount: depositAmount.toString(),
      includesVideo,
      videoPrice: includesVideo ? "50000" : undefined,
      notes: formData.notes,
      whatsappMessage
    };

    createBookingMutation.mutate(bookingData);
  };

  // Filter routes by vehicle type
  const cuatrimetoRoutes = routes.filter((r: Route) => r.vehicleType === 'cuatrimoto');
  const buggyRoutes = routes.filter((r: Route) => r.vehicleType === 'buggy_xds' && r.name !== 'trocha_vip');
  const trochaRoutes = routes.filter((r: Route) => r.name === 'trocha_vip');

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="motorsport-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            <i className="fas fa-calendar-plus text-primary mr-2"></i>
            Reserva tu Aventura
          </CardTitle>
          <CardDescription className="text-center">
            Completa el formulario para hacer tu reserva
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Select Vehicle Type */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">1. Elige tu vehículo</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  type="button"
                  variant={selectedVehicleCategory === 'cuatrimoto' ? 'default' : 'outline'}
                  className="h-20 flex flex-col justify-center"
                  onClick={() => {
                    setSelectedRoute(null);
                    setSelectedVehicleCategory('cuatrimoto');
                  }}
                  data-testid="select-cuatrimoto">
                  <i className="fas fa-motorcycle text-2xl mb-1"></i>
                  Cuatrimoto
                </Button>
                <Button
                  type="button"
                  variant={selectedVehicleCategory === 'buggy' ? 'default' : 'outline'}
                  className="h-20 flex flex-col justify-center"
                  onClick={() => {
                    setSelectedRoute(null);
                    setSelectedVehicleCategory('buggy');
                  }}
                  data-testid="select-buggy">
                  <i className="fas fa-car text-2xl mb-1"></i>
                  Buggy Can-Am
                </Button>
                <Button
                  type="button"
                  variant={selectedVehicleCategory === 'trocha' ? 'default' : 'outline'}
                  className="h-20 flex flex-col justify-center"
                  onClick={() => {
                    setSelectedRoute(null);
                    setSelectedVehicleCategory('trocha');
                  }}
                  data-testid="select-trocha">
                  <i className="fas fa-compass text-2xl mb-1"></i>
                  Trocha VIP
                </Button>
              </div>
            </div>

            {/* Step 2: Select Route */}
            {selectedVehicleCategory && (
              <div className="space-y-4">
                <Label className="text-lg font-semibold">2. Selecciona la ruta</Label>
                <Select 
                  value={selectedRoute?.id || ""}
                  onValueChange={(value) => {
                    const route = routes.find((r: Route) => r.id === value);
                    setSelectedRoute(route || null);
                  }} 
                  data-testid="route-select">
                  <SelectTrigger data-testid="route-select-trigger">
                    <SelectValue placeholder="Elige una ruta" />
                  </SelectTrigger>
                  <SelectContent>
                    {(selectedVehicleCategory === 'cuatrimoto' ? cuatrimetoRoutes :
                      selectedVehicleCategory === 'buggy' ? buggyRoutes : trochaRoutes)
                      .map((route: Route) => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.displayName} - {route.duration}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 3: Vehicle Options for Buggy */}
            {selectedRoute && selectedRoute.vehicleType === 'buggy_xds' && selectedRoute.name !== 'trocha_vip' && (
              <div className="space-y-4">
                <Label className="text-lg font-semibold">3. Modelo de Buggy</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={selectedBuggyModel === 'xds' ? 'default' : 'outline'}
                    onClick={() => setSelectedBuggyModel('xds')}
                    data-testid="select-xds">
                    XDS - ${selectedRoute.xdsPrice ? parseInt(selectedRoute.xdsPrice).toLocaleString() : '0'}
                  </Button>
                  <Button
                    type="button"
                    variant={selectedBuggyModel === 'x3' ? 'default' : 'outline'}
                    onClick={() => setSelectedBuggyModel('x3')}
                    data-testid="select-x3">
                    X3 - ${selectedRoute.x3Price ? parseInt(selectedRoute.x3Price).toLocaleString() : '0'}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Individual or Couple */}
            {selectedRoute && selectedRoute.vehicleType === 'cuatrimoto' && (
              <div className="space-y-4">
                <Label className="text-lg font-semibold">3. ¿Individual o en pareja?</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="couple"
                    checked={isCouple}
                    onCheckedChange={(checked) => setIsCouple(checked === true)}
                    data-testid="couple-checkbox"
                  />
                  <Label htmlFor="couple">
                    En pareja (+${selectedRoute.couplePrice ? (parseInt(selectedRoute.couplePrice) - parseInt(selectedRoute.individualPrice || '0')).toLocaleString() : '0'})
                  </Label>
                </div>
              </div>
            )}

            {/* Step 5: Date Selection */}
            {selectedRoute && (
              <div className="space-y-4">
                <Label htmlFor="date" className="text-lg font-semibold">4. Fecha de la aventura</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  data-testid="date-input"
                />
                {availability && selectedDate && (
                  <div className={`p-3 rounded-lg ${availability.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {availability.isAvailable ? (
                      <span>✅ Fecha disponible ({availability.spotsRemaining} cupos restantes)</span>
                    ) : (
                      <span>❌ Fecha no disponible</span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 6: Video Option */}
            {selectedRoute && (
              <div className="space-y-4">
                <Label className="text-lg font-semibold">5. Extras</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="video"
                    checked={includesVideo}
                    onCheckedChange={(checked) => setIncludesVideo(checked === true)}
                    data-testid="video-checkbox"
                  />
                  <Label htmlFor="video">
                    Video profesional (+$50.000 - ¡Ahorra $20.000 vs punto físico!)
                  </Label>
                </div>
              </div>
            )}

            {/* Step 7: Customer Information */}
            {selectedRoute && (
              <div className="space-y-4">
                <Label className="text-lg font-semibold">6. Información de contacto</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      value={formData.customerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                      required
                      data-testid="name-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">WhatsApp *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      placeholder="+57 300 123 4567"
                      required
                      data-testid="phone-input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email (opcional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                    data-testid="email-input"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Alguna información adicional..."
                    data-testid="notes-input"
                  />
                </div>
              </div>
            )}

            {/* Price Summary */}
            {selectedRoute && (
              <div className="motorsport-card rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Resumen de la reserva</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ruta: {selectedRoute.displayName}</span>
                    <span>${calculatePrice().toLocaleString()}</span>
                  </div>
                  {includesVideo && (
                    <div className="flex justify-between text-secondary">
                      <span>Video profesional</span>
                      <span>+$50.000</span>
                    </div>
                  )}
                  <hr className="border-border" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${calculatePrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Anticipo requerido</span>
                    <span>${calculateDeposit().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            {selectedRoute && (
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-accent text-primary-foreground py-3 text-lg font-bold"
                disabled={createBookingMutation.isPending || !availability?.isAvailable}
                data-testid="submit-booking">
                {createBookingMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Procesando reserva...
                  </>
                ) : (
                  <>
                    <i className="fab fa-whatsapp mr-2"></i>
                    Reservar por WhatsApp
                  </>
                )}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}