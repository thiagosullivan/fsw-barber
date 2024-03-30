import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { Barbershop, Booking, Prisma, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { date } from "zod";

interface BookingInfoProps {
    booking: Partial<Pick<Booking, 'date'>> & {
        service: Pick<Service, "name" | "price">;
        barbershop: Pick<Barbershop, "name">;
    };
}

const BookingInfo = ({booking}: BookingInfoProps) => {
    return (
        <Card>
            <CardContent className="p-3 gap-3 flex flex-col">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold">{booking.service.name}</h2>
                    <h3 className="font-bold text-sm">
                        {""}
                        {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(Number(booking.service.price))}
                    </h3>
                </div>

                {booking.date && (
                    <>
                        <div className="flex justify-between">
                            <h3 className="text-gray-400">Data</h3>
                            <h4 className="text-sm">
                                {format(booking.date, "dd 'de' MMMM", {
                                    locale: ptBR
                                })}
                            </h4>
                        </div>

                        <div className="flex justify-between">
                            <h3 className="text-gray-400">Horário</h3>
                            <h4 className="text-sm">{format(booking.date, "hh:mm")}</h4>
                        </div>
                    </>
                )}

                <div className="flex justify-between">
                    <h3 className="text-gray-400">Barbearia</h3>
                    <h4 className="text-sm">{booking.barbershop.name}</h4>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default BookingInfo;