import { CreateAuthorDto } from './create-author.dto';

export interface AuthorDto extends CreateAuthorDto {
  id: string;
}
