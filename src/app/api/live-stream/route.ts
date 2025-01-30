import { NextResponse } from "next/server";

export type LiveStreamResponse = {
  isOnline: boolean;
  videoId: string | null;
  aboveLimit: boolean;
};

export async function GET() {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.GOOGLE_API_KEY;
    const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !youtubeChannelId) {
      return NextResponse.json(
        { error: "Credentials are invalid (GApiKey or ChannelID)" },
        { status: 500 },
      );
    }

    // test
    return NextResponse.json({
      aboveLimit: false,
      isOnline: false,
      videoId: "",
    });

    // Define the external API endpoint
    const googleApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtubeChannelId}&eventType=live&type=video&key=${apiKey}`;

    // Fetch data from the external API
    const response = await fetch(googleApiUrl);

    // Handle specific error codes
    if (!response.ok) {
      if (response.status === 403) {
        // Handle quota limit exceeded (403 status)
        return NextResponse.json(
          {
            aboveLimit: true,
            isOnline: false,
            videoId: null,
          },
          { status: 200 },
        );
      }

      // Handle other non-OK responses
      return NextResponse.json(
        {
          error: "Failed to fetch stream status",
        },
        { status: response.status },
      );
    }

    // Parse the response data
    const data = await response.json();

    // Prepare the response based on the API data
    let responseData: LiveStreamResponse;

    if (data.pageInfo?.totalResults === 0) {
      responseData = {
        aboveLimit: false,
        isOnline: false,
        videoId: null,
      };
    } else if (data.pageInfo?.totalResults > 0) {
      responseData = {
        aboveLimit: false,
        isOnline: true,
        videoId: data.items[0]?.id?.videoId || null,
      };
    } else {
      return NextResponse.json(
        { error: "Unexpected response structure from YouTube API" },
        { status: 500 },
      );
    }
    // Return the response data
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching stream status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
