import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

/**
 * Login DTO
 */
export class LoginDTO {
  @ApiProperty({ example: 'zhangsan', description: 'username' })
  @Rule(RuleType.string().required().min(5).max(20))
  username: string;

  @ApiProperty({ example: 'Abc_12345', description: 'password' })
  @Rule(RuleType.string().required().min(5).max(20))
  password: string;
}
