import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { staticRoutes, buggyRoutes, type StaticRoute } from "@/data/routes";
import { whatsappLink } from "@/data/constants";

export default function BookingForm() {
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState<string>("");
  const [selectedRoute, setSelectedRoute] = useState<StaticRoute | null>(null);
  const [selectedBuggyModel, setSelectedBuggyModel] = useState<string>("xds");
  const [isCouple, setIsCouple] = useState(false);
  const [includesVideo, setIncludesVideo] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    notes: ""
  });

  const { toast } = useToast();

  // Get available routes based on selected vehicle category
  const getAvailableRoutes = () => {
    if (selectedVehicleCategory === 'cuatrimoto') return staticRoutes;
    if (selectedVehicleCategory === 'buggy' || selectedVehicleCategory === 'trocha') return buggyRoutes;
    return [];
  };

  // Calculate total price
  const calculatePrice = () => {
    if (!selectedRoute) return 0;
    
    let basePrice = 0;
    
    if (selectedRoute.vehicleType === 'cuatrimoto') {
      basePrice = parseFloat(isCouple ? selectedRoute.couplePrice || '0' : selectedRoute.individualPrice || '0');
    } else if (selectedBuggyModel === 'x3') {
      basePrice = parseFloat(selectedRoute.couplePrice || '0');
    } else {
      basePrice = parseFloat(selectedRoute.couplePrice || '0');
    }
    
    const videoPrice = includesVideo ? 50000 : 0;
    return basePrice + videoPrice;
  };

  // Calculate deposit
  const calculateDeposit = () => {
    if (!selectedRoute) return 0;
    return selectedRoute.vehicleType === 'cuatrimoto' ? 100000 : 200000;
  };

  const handleVehicleCategoryChange = (value: string) => {
    setSelectedVehicleCategory(value);
    setSelectedRoute(null);
    if (value === 'cuatrimoto') {
      setIsCouple(false);
    }
  };

  const handleRouteChange = (routeId: string) => {
    const routes = getAvailableRoutes();
    const route = routes.find(r => r.id === routeId);
    setSelectedRoute(route || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoute || !selectedDate || !formData.customerName || !formData.customerPhone) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor completa todos los campos requeridos: ruta, fecha, nombre y teléfono.",
        variant: "destructive"
      });
      return;
    }

    const totalPrice = calculatePrice();
    const depositAmount = calculateDeposit();
    const vehicleType = selectedRoute.vehicleType === 'cuatrimoto' ? 'Cuatrimoto' : 
      selectedBuggyModel === 'x3' ? 'Buggy Can-Am X3' : 'Buggy Can-Am XDS';

    // Build WhatsApp message
    const whatsappMessage = `¡Hola XTREMCOL! Quiero hacer una reserva:

📅 *Fecha:* ${selectedDate}
🏍️ *Ruta:* ${selectedRoute.displayName}
🚗 *Vehículo:* ${vehicleType}
${selectedRoute.vehicleType === 'cuatrimoto' ? `👥 ${isCouple ? 'Pareja' : 'Individual'}` : ''}
${includesVideo ? '🎥 *Con video profesional* (+$50.000)' : ''}

💰 *Precio Total:* $${totalPrice.toLocaleString()} COP
💳 *Anticipo requerido:* $${depositAmount.toLocaleString()} COP

👤 *Nombre:* ${formData.customerName}
📞 *Teléfono:* ${formData.customerPhone}
${formData.notes ? `📝 *Notas:* ${formData.notes}` : ''}

¿Tienen disponibilidad para esta fecha?`;

    // Open WhatsApp with the message
    window.open(whatsappLink(whatsappMessage), '_blank');

    // Show success message
    toast({
      title: "¡Redirigiendo a WhatsApp!",
      description: "Te hemos redirigido a WhatsApp para confirmar tu reserva.",
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
      notes: ""
    });
  };

  const totalPrice = calculatePrice();
  const depositAmount = calculateDeposit();

  return (
    <section id="reservar" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="booking-title">
            Reserva tu Aventura <i className="fas fa-calendar-check text-primary ml-2"></i>
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="booking-subtitle">
            Completa el formulario y confirma por WhatsApp
          </p>
        </div>

        <Card className="motorsport-card">
          <CardHeader>
            <CardTitle>Datos de Reserva</CardTitle>
            <CardDescription>
              Selecciona tu ruta y completa tus datos. Te redirigiremos a WhatsApp para confirmar disponibilidad.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vehicle Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="vehicle-category">Tipo de Vehículo *</Label>
                <Select value={selectedVehicleCategory} onValueChange={handleVehicleCategoryChange}>
                  <SelectTrigger id="vehicle-category" data-testid="select-vehicle-category">
                    <SelectValue placeholder="Selecciona el tipo de vehículo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cuatrimoto">🏍️ Cuatrimoto (ATV)</SelectItem>
                    <SelectItem value="buggy">🚙 Buggy Can-Am</SelectItem>
                    <SelectItem value="trocha">🌄 Trocha VIP (Buggy Día Completo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Buggy Model Selection */}
              {(selectedVehicleCategory === 'buggy' || selectedVehicleCategory === 'trocha') && (
                <div className="space-y-2">
                  <Label htmlFor="buggy-model">Modelo de Buggy *</Label>
                  <Select value={selectedBuggyModel} onValueChange={setSelectedBuggyModel}>
                    <SelectTrigger id="buggy-model" data-testid="select-buggy-model">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xds">Can-Am XDS (1 hora)</SelectItem>
                      <SelectItem value="x3">Can-Am X3 (Medio día)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Route Selection */}
              {selectedVehicleCategory && (
                <div className="space-y-2">
                  <Label htmlFor="route">Ruta *</Label>
                  <Select value={selectedRoute?.id || ""} onValueChange={handleRouteChange}>
                    <SelectTrigger id="route" data-testid="select-route">
                      <SelectValue placeholder="Selecciona la ruta" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableRoutes().map((route) => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.displayName} - {route.duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Route Details */}
              {selectedRoute && (
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold">{selectedRoute.displayName}</h4>
                  <p className="text-sm text-muted-foreground">{selectedRoute.description}</p>
                  <div className="text-sm">
                    <strong>Incluye:</strong>
                    <ul className="ml-4 mt-1">
                      {selectedRoute.includes.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Couple/Individual Selection for Cuatrimoto */}
              {selectedVehicleCategory === 'cuatrimoto' && selectedRoute && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is-couple" 
                    checked={isCouple} 
                    onCheckedChange={(checked) => setIsCouple(checked as boolean)}
                    data-testid="checkbox-couple"
                  />
                  <Label htmlFor="is-couple" className="cursor-pointer">
                    Reservar para pareja (+$50.000 aprox)
                  </Label>
                </div>
              )}

              {/* Video Option */}
              {selectedRoute && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includes-video" 
                    checked={includesVideo} 
                    onCheckedChange={(checked) => setIncludesVideo(checked as boolean)}
                    data-testid="checkbox-video"
                  />
                  <Label htmlFor="includes-video" className="cursor-pointer">
                    Agregar video profesional POV (+$50.000)
                  </Label>
                </div>
              )}

              {/* Date Selection */}
              <div className="space-y-2">
                <Label htmlFor="booking-date">Fecha de la Aventura *</Label>
                <Input
                  id="booking-date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  data-testid="input-date"
                />
                <p className="text-sm text-muted-foreground">
                  Confirmaremos disponibilidad por WhatsApp
                </p>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Tus Datos</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Nombre Completo *</Label>
                  <Input
                    id="customer-name"
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    data-testid="input-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer-phone">Teléfono / WhatsApp *</Label>
                  <Input
                    id="customer-phone"
                    type="tel"
                    placeholder="Ej: 3201234567"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                    data-testid="input-phone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Input
                    id="notes"
                    type="text"
                    placeholder="Ej: Primera vez en cuatrimoto, necesito casco grande"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    data-testid="input-notes"
                  />
                </div>
              </div>

              {/* Price Summary */}
              {selectedRoute && (
                <div className="bg-primary/10 p-6 rounded-lg space-y-3 border-2 border-primary/30">
                  <div className="flex justify-between items-center text-lg">
                    <span>Precio Base:</span>
                    <span className="font-semibold">
                      ${(totalPrice - (includesVideo ? 50000 : 0)).toLocaleString()} COP
                    </span>
                  </div>
                  {includesVideo && (
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Video Profesional:</span>
                      <span>+$50.000 COP</span>
                    </div>
                  )}
                  <div className="border-t border-primary/20 pt-3 flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-primary">${totalPrice.toLocaleString()} COP</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-secondary">
                    <span>Anticipo requerido:</span>
                    <span className="font-semibold">${depositAmount.toLocaleString()} COP</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    * El anticipo se confirma por WhatsApp. Resto se paga el día de la aventura.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg"
                className="w-full text-lg glow-red hover-glow"
                data-testid="button-submit-booking">
                <i className="fab fa-whatsapp mr-2"></i>
                Confirmar por WhatsApp
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Al enviar, serás redirigido a WhatsApp para confirmar disponibilidad y método de pago del anticipo.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
