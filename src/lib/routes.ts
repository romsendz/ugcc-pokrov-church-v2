export const ROUTES = {
  index: "/" as const,
  schedule: "/schedule" as const,
  liveStream: "/live-stream" as const,
  communities: {
    mothersArePraying: "/communities/mothers-are-praying" as const,
    apostleshipOfPrayer: "/communities/apostleship-of-prayer" as const,
    homin: "/communities/homin" as const,
  },
  about: {
    history: "/about/history" as const,
    monastery: "/about/monastery" as const,
    contact: "/about/contact" as const,
  },
  auth: {
    signIn: "/auth/sign-in" as const,
    signUp: "/auth/sign-up" as const,
  },
  admin: {
    index: "/admin" as const,
    schedule: {
      index: "/admin/schedule" as const,
      edit: "/admin/schedule/edit" as const,
    },
    myProfile: "/admin/my-profile",
  },

  /* external links */
  EXTERNAL: {
    facebookChurch: "https://www.facebook.com/ugccpokrovzalishchyky/" as const,
    facebook5Breads: "https://www.facebook.com/groups/262819928471960" as const,
    facebookFriends:
      "https://www.facebook.com/profile.php?id=100064304162104" as const,
    youtubeChurch:
      "https://www.youtube.com/@%D0%A5%D1%80%D0%B0%D0%BC%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D0%B8%D0%9F%D1%80%D0%B5%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D1%97%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B8%D1%86%D1%96" as const,
    wikipediaChurch:
      "https://uk.wikipedia.org/wiki/%D0%A6%D0%B5%D1%80%D0%BA%D0%B2%D0%B0_%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D0%B8_%D0%9F%D1%80%D0%B5%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D1%97_%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B8%D1%86%D1%96_(%D0%97%D0%B0%D0%BB%D1%96%D1%89%D0%B8%D0%BA%D0%B8)" as const,
    googleMapsLocation: "https://maps.app.goo.gl/hJHePobeKQiiE4wS9" as const,
    githubReference: "https://github.com/romsendz" as const,
  },
} as const;
