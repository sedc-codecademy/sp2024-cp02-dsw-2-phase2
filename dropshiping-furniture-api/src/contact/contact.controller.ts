import { BadRequestException, Body, Controller, Get, Post, Res } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { Order } from "src/orders/entities/order.entity";



@Controller("contact")
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Get()
   sendMailer(@Res() response: any) {
        const mail = this.contactService.sendMail({ customerName: 'John Doe', customerEmail: 'john@example.com', id: 'ORDER123' });
        
        return response.status(200).json({
            message: 'success',
            mail,
        });
    }

    @Post()
    async sendOrderNotification(
        @Res() response: any,
        @Body('order') orderData: Order | { customerName?: string; customerEmail?: string; id?: string }
    ) {
        if (!orderData || typeof orderData !== 'object' || Object.keys(orderData).length === 0) {
            throw new BadRequestException('Invalid order data provided');
        }

        try {
            await this.contactService.sendMail(orderData);

            return response.status(201).json({
                message: 'Order notification sent successfully',
                orderId: orderData.id || null,
            });
        } catch (error) {
            console.error('Error sending order notification:', error);
            return response.status(500).json({
                message: 'Failed to send order notification',
                error: error.message,
            });
        }
    }
}

