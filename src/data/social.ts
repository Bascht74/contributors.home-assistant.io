import {
  type SimpleIcon,
  siBluesky,
  siDiscord,
  siFacebook,
  siGithub,
  siInstagram,
  siMastodon,
  siReddit,
  siX,
  siYoutube,
} from "simple-icons";

export interface SocialLink {
  title: string;
  url: string;
  icon: SimpleIcon;
}

// The same accounts as the home-assistant.io footer.
export const SOCIAL_LINKS: SocialLink[] = [
  { title: "GitHub", url: "https://github.com/home-assistant", icon: siGithub },
  { title: "Discord", url: "https://www.home-assistant.io/join-chat", icon: siDiscord },
  { title: "YouTube", url: "https://youtube.com/@home_assistant", icon: siYoutube },
  { title: "Reddit", url: "https://reddit.com/r/homeassistant", icon: siReddit },
  { title: "Mastodon", url: "https://fosstodon.org/@homeassistant", icon: siMastodon },
  { title: "Bluesky", url: "https://bsky.app/profile/home-assistant.io", icon: siBluesky },
  { title: "X", url: "https://x.com/home_assistant", icon: siX },
  { title: "Facebook", url: "https://www.facebook.com/homeassistantio", icon: siFacebook },
  { title: "Instagram", url: "https://www.instagram.com/homeassistant/", icon: siInstagram },
];
