"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { IEventItem } from "@/type/event";

type JoinEventButtonProps = {
      event: IEventItem;
};

const JoinEventButton = ({ event }: JoinEventButtonProps) => {
      const { data: session, isPending: isSessionPending } =
            authClient.useSession();
      const [isJoining, setIsJoining] = useState(false);
      const [message, setMessage] = useState<string | null>(null);

      const handleJoinedEvent = async () => {
            const user = session?.user;

            if (!user) {
                  setMessage("Please log in to join this event.");
                  return;
            }

            try {
                  setIsJoining(true);
                  setMessage(null);

                  const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/joined`,
                        {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                    ...event,
                                    userId: user.id,
                                    userEmail: user.email,
                              }),
                        },
                  );

                  if (!response.ok) {
                        throw new Error("Failed to join event");
                  }

                  setMessage("You joined this event successfully.");
            } catch (error) {
                  console.error(error);
                  setMessage("Could not join this event. Please try again.");
            } finally {
                  setIsJoining(false);
            }
      };

      return (
            <div className="space-y-2">
                  <Button
                        onClick={handleJoinedEvent}
                        disabled={isSessionPending || isJoining}
                        className="w-full bg-green-600 hover:bg-green-700"
                  >
                        {isJoining ? "Joining..." : "Join This Event"}
                  </Button>
                  {message && (
                        <p className="text-center text-sm text-muted-foreground">
                              {message}
                        </p>
                  )}
            </div>
      );
};

export default JoinEventButton;
