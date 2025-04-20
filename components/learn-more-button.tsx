'use client';

import { Button } from "@/components/ui/button";

export default function LearnMoreButton() {
  const handleClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("chat-bot", "1");
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <Button variant="default" onClick={handleClick}>
      Learn More
    </Button>
  );
}