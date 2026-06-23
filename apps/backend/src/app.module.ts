import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { ShippingModule } from './shipping/shipping.module';
import { SettingsModule } from './settings/settings.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    ShippingModule,
    SettingsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
