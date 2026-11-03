# 人物素材与提示

## 李晨光（原图复用）

- 文件：`dist/assets/characters/li-chenguang.png`
- 来自既有项目 `ysm19990103/hospital_game` 的 `assets/lichenguang-player-small.png`。
- 来源提交：`bb44bca143674edff38d5aa99ce973c3e72a7b14`
- Git blob SHA：`35e712a5aaccb3d360dc6a4b19bfded6acd7bf2e`
- 原始地址：https://raw.githubusercontent.com/ysm19990103/hospital_game/bb44bca143674edff38d5aa99ce973c3e72a7b14/assets/lichenguang-player-small.png
- 512 × 768 PNG，透明背景。逐字节复用，没有重画或修改图片。

## 同事与高年资上级（既有配套素材复用）

原项目以李晨光立绘作为画风参考制作了两位配套人物，本项目逐字节复用。现有资源中的场景插画或其他主角形象不直接作为这两位角色。人物均为虚构教学角色，不指向现实中的同事或上级，也不暗示任何职级、年龄或性别必然具有负面行为。

- 同事：`dist/assets/characters/colleague.png`；1024 × 1536 透明 PNG。
- 高年资上级：`dist/assets/characters/senior.png`；1024 × 1536 透明 PNG。网站以 CSS 水平翻转，使角色朝向对话中央。
- 生成方式：内置图像生成工具；李晨光原图仅作为画风、质感和服装尺度参考。
- 输出保留原始像素。网页通过 CSS 调整展示尺寸和裁切位置。

### 同事提示

Use case: illustration-story. Asset type: reusable transparent full-body character portrait for a Chinese hospital dialogue-learning web app. Reference image: the existing fictional protagonist Li Chenguang; use ONLY its polished semi-realistic East Asian anime illustration style, clean painterly shading, clothing texture, body proportions and warm neutral light. Do not reproduce his identity or pose exactly. Create ONE new person, standing, complete head-to-shoes visible, centered with small transparent margins, a three-quarter view turned slightly toward the LEFT of the image, looking to the left toward a conversation partner. Genuine transparent alpha background. No scene, no floor, no text, no watermark, no logos, no border. Keep the figure visually consistent with the reference, detailed but readable at small size. Output portrait aspect 2:3. Subject: a female Chinese hospital colleague around age 30, dark straight hair tied in a practical low ponytail, neat side fringe, a distinct natural face, calm attentive expression, white open lab coat over muted jade-teal scrubs, simple dark trousers and comfortable dark shoes. One hand holds a small closed dark-green work folder at waist level, the other relaxed; natural well-formed hands. Approachable professional colleague; no smirk, no villain expression, no exaggerated sexuality. Full body with a relaxed, realistic stance.

### 高年资上级提示

Use case: illustration-story. Asset type: reusable transparent full-body character portrait for a Chinese hospital dialogue-learning web app. Reference image: the existing fictional protagonist Li Chenguang; use ONLY its polished semi-realistic East Asian anime illustration style, clean painterly shading, clothing texture, body proportions and warm neutral light. Do not reproduce his identity or pose exactly. Create ONE new person, standing, complete head-to-shoes visible, centered with small transparent margins, a three-quarter view turned slightly toward the LEFT of the image, looking to the left toward a conversation partner. Genuine transparent alpha background. No scene, no floor, no text, no watermark, no logos, no border. Keep the figure visually consistent with the reference, detailed but readable at small size. Output portrait aspect 2:3. Subject: a Chinese male senior attending physician around age 52, distinct mature face, subtle smile lines, short neatly combed salt-and-pepper hair, thin rectangular metal spectacles, calm serious listening expression. White open doctor's coat over a light warm-gray buttoned shirt and dark charcoal trousers, dark practical shoes, a simple pen in the coat pocket. Holds a slim closed clipboard naturally at his waist with relaxed hands. Experienced and professional, neither villainous nor intimidating caricature; not old or frail. Full body in an easy three-quarter standing stance.

## 离线处理

`build.mjs` 将三张 PNG 编码为 data URI，替换离线版内人物注册表中的本地路径。自动检查确保离线图片解码后与网站资源完全一致，不依赖图床或网络。
