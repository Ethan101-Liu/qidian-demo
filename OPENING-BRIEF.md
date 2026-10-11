# 剑仙开场连续视频制作要求

状态：已改用用户提供的视频并完成本地接入，无需 Runway。原视频约 12.075 秒，1280×720；网页版本为约 12.042 秒的静音 H.264、289 个独立视频帧，首帧回退图片从原视频提取。

当前首帧：`assets/character/intro-film-poster.png`。人物采用已确认的 C 版水墨电影 CG 方向。开场没有起点标识、导航、正文标题，只保留滚动提示与跳过按钮。

## 镜头与动作

16:9，建议 10 秒，单个连续镜头，固定人物身份、服饰和云海环境。

- 0–2 秒：白衣剑仙背对观众，黑发高束，宽袖和衣摆随风飘扬，立于晨曦云海之巅。镜头从全身缓慢靠近。
- 2–5 秒：镜头继续平稳靠近，人物自然转身至面对观众，露出清冷面容、剑眉星目；双手持三本功法秘籍。腰间青锋长剑保持入鞘。
- 5–7 秒：短暂展示功法秘籍，人物、手指和书本姿态保持连贯，灵光轻微流转。
- 7–9 秒：人物摆臂挥出三本秘籍，秘籍从手中实际释放，向镜头飞来并向两侧展开；纸页翻动、衣袖跟随动作。
- 9–10 秒：书页掠过前景形成转场遮挡，最后画面留出与正文书封舞台衔接的空间。

## 生成提示词

One uninterrupted cinematic shot, 16:9, ten seconds. Use the provided first frame as the exact environment and character identity reference. An adult Chinese male sword immortal wears elegant flowing white wide-sleeved robes with subtle ink-wash embroidery, long black hair in a high ponytail, a straight sheathed sword at his waist. He stands above a vast sea of clouds at sunrise. Initially his back faces the viewer. The camera slowly dollies toward him as he physically and smoothly turns to face the camera, revealing a cool handsome face with straight brows and clear eyes. He holds three cloth-bound cultivation manuals in his hands. He pauses briefly, then naturally swings his arms and releases the three books toward the camera. The books visibly leave his fingers, fan outward, and their pages flutter through the foreground to provide a transition. Consistent hands, fingers, face, clothing, sword, and book count. Wind moves his hair and robe, subtle spiritual light surrounds him, volumetric dawn light and cinematic ink-wash CG detail. Smooth continuous physical movement and camera motion, no cuts, no pose dissolves, no teleporting books, no face morphing, no text, no logos, no UI.

## 接入与验收

视频保存到 `assets/character/intro-film.mp4`，配置 `opening-config.js`。视频静音，由滚动进度控制播放位置，停止滚动时停止动作，反向滚动时回退。动作在整体开场的 88% 前完成，最后 12% 用于转场；正文和导航从 90% 开始一起淡入。

先验证背面、转身、持书、挥书、书页掠镜头这些阶段真实连贯，再接入网站。需要检查正向和反向滚动、快速跨越进度、视频加载失败以及正文衔接。首帧、镜头缩放和交叉淡入不能作为连续人物动作已完成的证明。


## 已接入素材与验证

用户提供「仙侠小说网站开场视频 (1).mp4」，原文件保留在用户 Downloads 目录；项目中的 `assets/character/intro-film.mp4` 是本地转码版本，`intro-original.mp4` 保留原始副本。画面没有原生黑边，网页以居中 cover 填满视口。

已在当前浏览器验证加载成功、正向推进、反向回退、停止时保持画面、导航与正文同透明度淡入；本地服务已支持视频 MIME 与 HTTP 字节范围读取。当前素材原生 720p，放大到较大屏幕时清晰度受原视频分辨率限制。
