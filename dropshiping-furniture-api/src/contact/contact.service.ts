import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class ContactService {
    constructor(private readonly mailService: MailerService) { }

    async sendMail(order: Order | { customer_name: string; customer_email: string; id?: string }): Promise<void> {
        if (!order || typeof order !== 'object' || Object.keys(order).length === 0) {
            throw new Error('Invalid order object provided');
        }

        const { customer_name, customer_email, id } = order;

        if (!customer_name || !customer_email || !id) {
            throw new Error('Missing required order details');
        }

        const message = `Your order has been successfully sent`;

        await this.mailService.sendMail({
            from: '<admin@gmail.com>',
            to: customer_email,
            subject: message,
            context: {
                customer_name,
                orderId: id
            },
        });
    }
}
