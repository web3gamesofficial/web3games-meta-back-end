import { ApiProperty } from '@midwayjs/swagger';
import {PickDto} from '@midwayjs/validate'
import {User} from '../../entity/user'

/**
 * login success return VO
 */
export class LoginVO {
  @ApiProperty({ description: 'access credentials' })
  accessToken: string;
  @ApiProperty({ description: 'timeout（s）' })
  expiresIn: number;
}

/**
 *
 * Remove the password, but the corresponding generic type is not applicable
 */
export class UserVO extends PickDto(User, []) {}
