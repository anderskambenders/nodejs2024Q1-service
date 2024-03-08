import { IsInt, IsOptional, IsUUID } from 'class-validator';

class UpdateAlbumDto {
  @IsOptional()
  name: string;
  @IsOptional()
  @IsInt()
  year: number;
  @IsOptional()
  @IsUUID()
  artist?: string | null;
}

export default UpdateAlbumDto;
