---
title: Images and videos
description: How to add screenshots, diagrams, and YouTube videos to a page on home-assistant.io, and how to describe them for every reader.
order: 2
---

A good screenshot can save a paragraph of explanation. A video can show something words cannot. This page covers where images go, how to add them to a page, and how to embed a video.

## Where images live

Store every image in the documentation repository, under [`source/images`](https://github.com/home-assistant/home-assistant.io/tree/current/source/images). Pick the subfolder that matches the page:

- `source/images/integrations/<domain>/` for an integration, like `source/images/integrations/matter/`.
- `source/images/docs/<topic>/` for the general documentation.
- `source/images/dashboards/` for dashboards and cards.

Do not link to images hosted somewhere else, like your own GitHub repository or an image hosting service. External images disappear, change, or slow the page down.

On the page, refer to the image by its published path. That is the path without `source`, so `source/images/integrations/matter/matter_device-info.png` becomes `/images/integrations/matter/matter_device-info.png`.

> [!NOTE]
> The **Edit** button on GitHub does not let you upload images. To add an image, work on a fork, either on your own machine or by uploading the file to your fork on GitHub first. See [Preview the site locally](/writing/guides/local-preview/).

## Add an image

Use Markdown for images, wherever you can:

```markdown
![Screenshot of the tile card with a brightness slider](/images/dashboards/features/screenshot-tile-feature-grid.png)
```

An image can also illustrate a step. Indent it so it belongs to the list item:

```markdown
1. To adjust the brightness, move the slider:
   ![Screenshot of the tile card with a brightness slider](/images/dashboards/features/screenshot-tile-feature-grid.png)
2. Select **Save**.
```

## Add a caption

Markdown has no caption syntax. To show a caption below the image, wrap it in a paragraph with the `img` class, and put the caption text after the image:

```html
<p class='img'>
  <img
    src='/images/dashboards/features/screenshot-tile-feature-grid.png'
    alt='Screenshot of the tile card with a brightness slider'
  >
  The tile card with a brightness slider
</p>
```

The image and caption then get a framed, centered layout, with the caption in italics.

## Dark mode and invertDark

Add the `invertDark` class to an image whose colors should be inverted when the page is shown in dark mode. This is meant for simple diagrams and drawings with dark lines on a transparent or white background. Do not use it on screenshots or photos: inverting those makes them look wrong.

```html
<p class='img'>
  <img
    class='invertDark'
    src='/images/integrations/infrared/infrared-overview.png'
    alt='Diagram of how commands reach a device through an infrared adapter'
  >
  How commands reach an infrared device
</p>
```

> [!NOTE]
> [home-assistant.io](https://www.home-assistant.io/) does not have a dark mode right now, and its stylesheets do not define `invertDark` yet, so the class has no visible effect there today. A few pages use it already.

## The lightbox

On home-assistant.io, readers can select an image in a documentation page or blog post to open it full size in a lightbox. It also works with the keyboard. You do not have to do anything for this: an image gets the lightbox automatically, unless:

- It is small. Images shown smaller than 160 by 100 pixels, and that are also smaller than 300 pixels in their original size, are skipped. This keeps inline icons out.
- It is a link or sits inside a link or button.
- It is an SVG file.
- It looks like a logo. Brand logos are skipped, based on their class, a path containing words like `logo` or `brand`, or alt text that mentions a logo.
- It is opted out.

To opt an image out of the lightbox, add the `data-no-lightbox` attribute or the `no-lightbox` class. You can put either one on the image itself, or on an element around it to opt out a whole group of images:

```html
<img
  src="/images/example.png"
  alt="Description of the image"
  data-no-lightbox
>
```

```html
<img
  class="no-lightbox"
  src="/images/example.png"
  alt="Description of the image"
>
```

## Write good alt text

Every image needs alt text. Screen readers read it out loud, and it shows when the image fails to load. Alt text is also what the lightbox announces when it opens the image.

- **Describe what the image shows,** and why it is there. "Screenshot of the integration settings, with the polling interval set to 30 seconds" helps. "Screenshot" does not.
- **Keep it short.** One sentence is usually enough.
- **Do not start with "Image of".** Screen readers already announce that it is an image. "Screenshot of" or "Diagram of" is fine, because it tells the reader what kind of image it is.
- **Do not repeat the caption word for word.** If the caption already says it all, the alt text can describe the visual details instead.
- **Do not put information only in the image.** Anything the reader needs to complete a step belongs in the text too.

## Keep screenshots useful

- Show the part of the screen that matters. Crop away the rest.
- Use the default [theme](/glossary/theme/) and language of Home Assistant, so the screenshot looks like what the reader sees.
- Remove or blur personal information, like names, addresses, tokens, and IP addresses.
- Replace screenshots that no longer match the interface. An outdated screenshot confuses more than no screenshot at all.

## Embed a YouTube video

Use the `lite-youtube` element to embed a YouTube video. It shows a lightweight preview first, and only loads the actual YouTube player when the reader starts the video. That keeps the page fast.

```html
<lite-youtube
  videoid="ZgoaoTpIhm8"
  videotitle="Introducing the Home Assistant Voice Preview Edition"
></lite-youtube>
```

- `videoid` is the part of the YouTube URL that comes after `watch?v=`. For `https://www.youtube.com/watch?v=ZgoaoTpIhm8`, that is `ZgoaoTpIhm8`.
- `videotitle` is the title of the video. Screen readers use it, so always add it.
- `videoStartAt` starts playback at a specific moment, in seconds from the start. Use it when only part of a long video is relevant.

For example, to start the video above at 1 hour, 5 minutes, and 7 seconds:

```html
<lite-youtube
  videoid="ZgoaoTpIhm8"
  videoStartAt="3907"
  videotitle="Introducing the Home Assistant Voice Preview Edition"
></lite-youtube>
```

To add a caption below a video, wrap it in a paragraph with the `img` class, the same way as an [image caption](#add-a-caption):

```html
<p class='img'>
  <lite-youtube
    videoid="ZgoaoTpIhm8"
    videoStartAt="3907"
    videotitle="Introducing the Home Assistant Voice Preview Edition"
  ></lite-youtube>
  Watch the Voice Preview Edition announcement
</p>
```

A video never replaces written steps. Not everyone can watch a video, and text is easier to scan and translate.
