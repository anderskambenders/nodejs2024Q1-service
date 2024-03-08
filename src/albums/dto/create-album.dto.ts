import { IsDefined, IsInt, IsOptional, IsUUID } from 'class-validator';
class CreateAlbumDto {
  @IsDefined()
  name: string;
  @IsDefined()
  @IsInt()
  year: number;
  @IsOptional()
  @IsUUID()
  artist?: string | null;
}

export default CreateAlbumDto;
