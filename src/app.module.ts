import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { AdminsModule } from './admins/admins.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub_categories/sub_categories.module';
import { UnitsModule } from './units/units.module';
import { ProductsModule } from './products/products.module';
import { ProductImagesModule } from './product_images/product_images.module';
import { SizedModule } from './sized/sized.module';
import { ProductVariantsModule } from './product_variants/product_variants.module';
import { ProductReviewsModule } from './product_reviews/product_reviews.module';
import { AuthModule } from './common/auth/module/auth.module';
import { PermissionsModule } from './permissions/permissions.module';
import { SeederModule } from './common/seeders/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // false in production
      })
    }),
    RolesModule,
    AdminsModule,
    CustomersModule,
    CategoriesModule,
    SubCategoriesModule,
    UnitsModule,
    ProductsModule,
    ProductImagesModule,
    SizedModule,
    ProductVariantsModule,
    ProductReviewsModule,
    AuthModule,
    PermissionsModule,
    SeederModule
  ],
})
export class AppModule {}
