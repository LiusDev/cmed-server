import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { SettingService } from './setting.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSettingDto } from './dtos/create-setting.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../entities/user.entity';
import { CreateServiceDto } from '../services/dtos/create-service.dto';
import UpdateSettingDto from './dtos/update-setting.dto';
import { Response } from 'express';


@Controller('setting')
export class SettingController {
	constructor(private readonly settingService: SettingService) {
	}

	@Get()
	async findAll(
		@Query()
		query: {
			name?: string;
			description?: string;
			page?: string;
			perPage?: string;
			sortBy?: string;
			order?: string;
		},
	) {
		return await this.settingService.findAll(query);
	}

	@Get("init")
	async init(@Res() res: Response) {
		const data: About = {
			title1: "Dấu ấn vượt thời gian",
			subtitle: "Giải pháp kiến tạo và phát triển phòng khám - chuỗi phòng khám",
			featuredImage: "/about/about-banner.webp",
			featuredButtonTitle: "1000++ khách hàng tin tưởng",
			featuredButtonTitle2: "100++ dự án ra mắt",
			tabTitle1: "Câu chuyện thương hiệu",
			tabTitle2: "Tầm nhìn, sứ mệnh",
			image2: "",
			tabTitle3: "Đội ngũ nhân sự",
			title2: "Khát vọng vươn mình ra biển lớn",
			content2: ["CMED được thành lập từ năm 2022 bởi các chuyên gia tư vấn và bác sĩ có kinh nghiệm, hiểu biết sâu sắc về lĩnh vực y tế - một lĩnh vực kinh doanh có điều kiện và đặc thù. Chúng tôi hiểu rằng để thành lập và tạo ra một cơ sở y tế hoạt động hiệu quả là không dễ dàng. Doanh nghiệp y tế tư nhân gặp khó khăn trong vấn đề thành lập, quản trị nhân sự, vận hành và ứng dụng các giải pháp chuyển đổi số. CMED đặt ra mục tiêu không chỉ là đơn vị tư vấn đưa ra giải pháp toàn diện mà còn đồng hành cùng với doanh nghiệp cho đến khi giải pháp thành công.", "Khát vọng gắn kết với mỗi khách hàng, với từng đối tác chiến lược, với mạng lưới nhân sự tài năng chính là nguồn cảm hứng và sức mạnh để chúng tôi cùng nhau lao động sáng tạo, không ngừng cải thiện để có thể phục vụ khách hàng tốt hơn mỗi ngày. Hiện tại, chúng tôi đang hợp tác chặt chẽ với khách hàng, cho dù đó là dự án xây dựng cơ sở y tế mới, mở thêm phạm vi hoạt động chuyên môn hay cải tiến hoạt động của các cơ sở y tế đang hoạt động. Chúng tôi hướng tới việc hỗ trợ thành lập, vận hành cơ sở y tế vận hành hiệu quả giúp thu hẹp khoảng cách giữa bệnh nhân và dịch vụ y tế tốt, khoảng cách giữa dịch vụ y tế của Việt Nam và thế giới. CMED lựa chọn phát triển với tâm thế chủ động, tiên phong trong lĩnh vực tư vấn y tế, với tầm nhìn tạo lập giá trị bền vững và nhân văn cho sự phát triển chung của ngành y tế Việt Nam."],
			quotes1: {
				content: "Hơn ai hết, chúng tôi hiểu rõ những khó khăn khi đặt những viên gạch đầu tiên xây dựng doanh nghiệp y tế tư nhân và những bất cập mà hệ thống y tế ở Việt Nam gặp phải. CMED mong muốn góp một cánh tay đồng hành cùng doanh nghiệp xây dựng doanh nghiệp với những giải pháp về vận hành, nhân sự, công nghệ và xây dựng, thực thi các chiến lược truyền thông.",
				author: "CEO - Founder Tang Anh Tuan",
				background: "/about/testimonials/bg.webp"
			},
			quotes2: [{
				title: "Tầm Nhìn",
				content: "Với đội ngũ chuyên gia giàu kinh nghiệm, uy tín, hoạt động trong ngành Luật và Y tế, CMED cung cấp cho khách hàng dịch vụ tư vấn toàn diện về các giải pháp tổng thể, pháp lý, nhân sự trong lĩnh vực y tế tư nhân, đặc biệt là các doanh nghiệp có vốn đầu tư nước ngoài. Chúng tôi tự tin mang đến cho khách hàng chất lượng dịch vụ hoàn hảo. CMED sẽ trở thành công ty tư vấn hàng đầu về lĩnh vực y tế trong nước và hướng đến xứng tầm khu vực Đông Nam Á.",
				image: "/about/vision/image.webp",
			}, {
				title: "Sứ Mệnh",
				content: "Sứ mệnh của chúng tôi là chung tay cùng bệnh viện, phòng khám, doanh nghiệp phát triển bền vững trong bối cảnh y tế hiện nay. CMED mong muốn đóng góp sức lực của mình vào sự nghiệp phát triển cơ sở hạ tầng, kiến trúc thượng tầng của nền Y tế Việt Nam.",
				image: "/about/vision/image2.webp"
			}],
		}
		this.settingService.create({ itemId: "about", language: "vi", content: data }, null)
		res.status(HttpStatus.OK).end()
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		return await this.settingService.findOne(id);
	}

	@Get('item/:itemId/:language')
	async findByItemId(@Param('itemId') itemId: string, @Param('language') language: string) {
		return await this.settingService.findByItemId(itemId, language);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(@Body() body: CreateSettingDto, @GetUser() createdUser: User) {
		return await this.settingService.create(body, createdUser);
	}

	@Put("about/:lang")
	@UseGuards(JwtAuthGuard)
	async updateAbout(@Body() body: About, @Param("lang") lang: string, @GetUser() modifiedUser: User) {
		return await this.settingService.updateAbout(body, lang, modifiedUser);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param('id') id: number,
		@Body() body: CreateSettingDto,
		@GetUser() modifiedUser: User,
	) {
		return await this.settingService.update(id, body, modifiedUser);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async partialUpdate(
		@Param('id') id: number,
		@Body() body: Partial<UpdateSettingDto>,
		@GetUser() modifiedUser: User,
	) {
		return await this.settingService.update(id, body, modifiedUser);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param('id') id: number, @Res() res: Response) {
		await this.settingService.remove(id);
		res.status(HttpStatus.NO_CONTENT).send();
	}
}
