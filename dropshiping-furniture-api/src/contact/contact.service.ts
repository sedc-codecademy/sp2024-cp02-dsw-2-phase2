import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class ContactService {
    constructor(private readonly mailService: MailerService) { }

    async sendMail(order: Order | { customerName?: string; customerEmail?: string; id?: string }): Promise<void> {
        if (!order || typeof order !== 'object' || Object.keys(order).length === 0) {
            throw new Error('Invalid order object provided');
        }

        const { customerName, customerEmail, id } = order;

        if (!customerName || !customerEmail || !id) {
            throw new Error('Missing required order details');
        }

        const message = `Your order has been successfully sent`;

        await this.mailService.sendMail({
            from: '<admin@gmail.com>',
            to: customerEmail,
            subject: message,
            context: {
                customerName,
                orderId: id
            },
        });
    }
}
