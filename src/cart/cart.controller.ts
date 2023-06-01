import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UserModule } from '../user/user.module';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

@UseGuards(AuthGuard, UserModule)
@Roles(Role.User)
@Controller('cart')
export class CartController {}
