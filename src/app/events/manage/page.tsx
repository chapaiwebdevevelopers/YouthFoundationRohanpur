"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { IEventItem } from "@/type/event";
import { eventCategories } from "@/lib/event-categories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
      Card,
      CardAction,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EventForm = Pick<
      IEventItem,
      "title" | "date" | "category" | "location" | "thumbnail" | "description"
>;

const emptyEventForm: EventForm = {
      title: "",
      date: "",
      category: "",
      location: "",
      thumbnail: "",
      description: "",
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const MyEventPage = () => {
      const router = useRouter();
      const { data: session, isPending } = authClient.useSession();
      const userEmail = session?.user?.email;
      const [events, setEvents] = useState<IEventItem[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [editingEvent, setEditingEvent] = useState<IEventItem | null>(
            null,
      );
      const [editForm, setEditForm] = useState<EventForm>(emptyEventForm);
      const [isSaving, setIsSaving] = useState(false);

      useEffect(() => {
            if (isPending) return;

            if (!userEmail) {
                  return;
            }

            const getData = async () => {
                  try {
                        setLoading(true);
                        setError(null);
                        const response = await fetch(
                              `${backendUrl}/events/user/${encodeURIComponent(userEmail)}`,
                              {
                                    headers: {
                                          "Content-Type": "application/json",
                                    },
                              },
                        );

                        if (!response.ok) {
                              throw new Error("Failed to fetch events");
                        }

                        setEvents(await response.json());
                  } catch (err) {
                        console.error(err);
                        setError(
                              "Could not load your events. Please try again.",
                        );
                  } finally {
                        setLoading(false);
                  }
            };

            getData();
      }, [isPending, userEmail]);

      const openEditDialog = (event: IEventItem) => {
            setEditingEvent(event);
            setEditForm({
                  title: event.title,
                  date: event.date ? event.date.slice(0, 10) : "",
                  category: event.category,
                  location: event.location,
                  thumbnail: event.thumbnail,
                  description: event.description,
            });
            setError(null);
      };

      const updateEditField = (
            field: keyof EventForm,
            value: string,
      ) => {
            setEditForm((current) => ({ ...current, [field]: value }));
      };

      const handleEditEvent = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!editingEvent) return;

            try {
                  setIsSaving(true);
                  setError(null);
                  const response = await fetch(
                        `${backendUrl}/events/manage/${editingEvent._id}`,
                        {
                              method: "PUT",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                    ...editForm,
                                    userEmail: editingEvent.userEmail,
                                    userId: editingEvent.userId,
                              }),
                        },
                  );

                  if (!response.ok) {
                        throw new Error("Failed to update event");
                  }

                  const responseText = await response.text();
                  const updatedEvent = responseText
                        ? JSON.parse(responseText)
                        : editForm;
                  setEvents((currentEvents) =>
                        currentEvents.map((currentEvent) =>
                              currentEvent._id === editingEvent._id
                                    ? { ...currentEvent, ...updatedEvent }
                                    : currentEvent,
                        ),
                  );
                  setEditingEvent(null);
                  router.replace("/events/manage");
            } catch (err) {
                  console.error(err);
                  setError("Could not update the event. Please try again.");
            } finally {
                  setIsSaving(false);
            }
      };

      const handleDeleteEvent = async (eventId: string) => {
            try {
                  const response = await fetch(
                        `${backendUrl}/events/manage/${eventId}`,
                        { method: "DELETE" },
                  );

                  if (!response.ok) {
                        throw new Error("Failed to delete event");
                  }

                  setEvents((currentEvents) =>
                        currentEvents.filter((event) => event._id !== eventId),
                  );
                  router.replace("/events/manage");
            } catch (err) {
                  console.error(err);
                  setError("Could not delete the event. Please try again.");
            }
      };

      if (isPending || (loading && userEmail)) {
            return <div className="p-6">Loading your events...</div>;
      }

      if (!userEmail) {
            return <div className="p-6">Please log in to see your events.</div>;
      }

      return (
            <div className="container mx-auto p-6">
                  <h1 className="mb-4 text-2xl font-bold">My Events</h1>
                  {error && <p className="mb-4 text-red-600">{error}</p>}

                  {events.length === 0 ? (
                        <p>You haven&apos;t created any events yet.</p>
                  ) : (
                        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                              {events.map((event) => (
                                    <Card
                                          key={event._id}
                                          className="relative mx-auto w-full max-w-sm pt-0"
                                    >
                                          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                                          <Image
                                                width={600}
                                                height={600}
                                                src={event.thumbnail}
                                                alt={event.title}
                                                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                                          />
                                          <CardHeader>
                                                <CardAction>
                                                      <Badge variant="secondary">
                                                            {event.category}
                                                      </Badge>
                                                </CardAction>
                                                <CardTitle>{event.title}</CardTitle>
                                                <CardDescription>
                                                      {event.location}
                                                </CardDescription>
                                          </CardHeader>
                                          <CardFooter className="flex gap-2">
                                                <Link href={`/events/${event._id}`}>
                                                      <Button>View Event</Button>
                                                </Link>
                                                <Button
                                                      variant="outline"
                                                      onClick={() =>
                                                            openEditDialog(event)
                                                      }
                                                >
                                                      Edit
                                                </Button>
                                                <AlertDialog>
                                                      <AlertDialogTrigger
                                                            render={
                                                                  <Button variant="destructive">
                                                                        Delete
                                                                  </Button>
                                                            }
                                                      />
                                                      <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                  <AlertDialogTitle>
                                                                        Are you absolutely sure?
                                                                  </AlertDialogTitle>
                                                                  <AlertDialogDescription>
                                                                        This action cannot be undone. This will permanently delete this event.
                                                                  </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                  <AlertDialogCancel>
                                                                        Cancel
                                                                  </AlertDialogCancel>
                                                                  <AlertDialogAction
                                                                        onClick={() =>
                                                                              handleDeleteEvent(
                                                                                    event._id,
                                                                              )
                                                                        }
                                                                  >
                                                                        Continue
                                                                  </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                      </AlertDialogContent>
                                                </AlertDialog>
                                          </CardFooter>
                                    </Card>
                              ))}
                        </ul>
                  )}

                  <Dialog
                        open={editingEvent !== null}
                        onOpenChange={(open) => {
                              if (!open && !isSaving) setEditingEvent(null);
                        }}
                  >
                        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                              <DialogHeader>
                                    <DialogTitle>Edit event</DialogTitle>
                                    <DialogDescription>
                                          Update the event details and save your changes.
                                    </DialogDescription>
                              </DialogHeader>
                              <form
                                    id="edit-event-form"
                                    onSubmit={handleEditEvent}
                                    className="grid gap-4"
                              >
                                    <Input
                                          name="title"
                                          value={editForm.title}
                                          onChange={(event) =>
                                                updateEditField(
                                                      "title",
                                                      event.target.value,
                                                )
                                          }
                                          placeholder="Event title"
                                          required
                                    />
                                    <div className="grid gap-4 sm:grid-cols-2">
                                          <Input
                                                name="date"
                                                type="date"
                                                value={editForm.date}
                                                onChange={(event) =>
                                                      updateEditField(
                                                            "date",
                                                            event.target.value,
                                                      )
                                                }
                                                required
                                          />
                                          <select
                                                name="category"
                                                value={editForm.category}
                                                onChange={(event) =>
                                                      updateEditField(
                                                            "category",
                                                            event.target.value,
                                                      )
                                                }
                                                className="h-10 rounded-md border bg-background px-3 text-sm"
                                                required
                                          >
                                                <option value="">
                                                      Select a category
                                                </option>
                                                {eventCategories.map((category) => (
                                                      <option
                                                            key={category.value}
                                                            value={category.value}
                                                      >
                                                            {category.label}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>
                                    <Input
                                          name="location"
                                          value={editForm.location}
                                          onChange={(event) =>
                                                updateEditField(
                                                      "location",
                                                      event.target.value,
                                                )
                                          }
                                          placeholder="Location / Venue"
                                          required
                                    />
                                    <Input
                                          name="thumbnail"
                                          type="url"
                                          value={editForm.thumbnail}
                                          onChange={(event) =>
                                                updateEditField(
                                                      "thumbnail",
                                                      event.target.value,
                                                )
                                          }
                                          placeholder="Thumbnail image URL"
                                          required
                                    />
                                    <Textarea
                                          name="description"
                                          value={editForm.description}
                                          onChange={(event) =>
                                                updateEditField(
                                                      "description",
                                                      event.target.value,
                                                )
                                          }
                                          placeholder="Event description"
                                          className="min-h-32 resize-none"
                                    />
                              </form>
                              <DialogFooter>
                                    <Button
                                          type="button"
                                          variant="outline"
                                          onClick={() => setEditingEvent(null)}
                                          disabled={isSaving}
                                    >
                                          Cancel
                                    </Button>
                                    <Button
                                          type="submit"
                                          form="edit-event-form"
                                          disabled={isSaving}
                                    >
                                          {isSaving ? "Saving..." : "Save changes"}
                                    </Button>
                              </DialogFooter>
                        </DialogContent>
                  </Dialog>
            </div>
      );
};

export default MyEventPage;
