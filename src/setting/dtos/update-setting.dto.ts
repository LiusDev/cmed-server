import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export default class UpdateSettingDto {
	@IsString()
	@MaxLength(255)
	@IsNotEmpty()
	itemId: string
	@IsString()
	@MaxLength(255)
	@IsNotEmpty()
	language: string
	@IsString()
	@IsNotEmpty()
	content: string
}