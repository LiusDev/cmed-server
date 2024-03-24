"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toWebp = void 0;
const sharp = require("sharp");
async function toWebp(data) {
    const imgData = data.substring(data.lastIndexOf(',') + 1);
    const featuredImageBuffer = await sharp(Buffer.from(imgData, "base64")).webp().toBuffer();
    return 'data:image/webp;base64,' + featuredImageBuffer.toString('base64');
}
exports.toWebp = toWebp;
//# sourceMappingURL=utils.js.map