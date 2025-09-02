import { supabase, Collection, Moment, User } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RomanticTimeline from "@/components/RomanticTimeline";

interface PageProps {
  params: Promise<{
    collection_id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { collection_id } = await params;
  const collection = await getCollection(collection_id);

  if (!collection) {
    return {
      title: "Collection Not Found",
    };
  }

  return {
    title: `${collection.name} - Rosette Demo`,
    description: `View moments from the collection: ${collection.name}`,
  };
}

export async function generateStaticParams() {
  const { data: collections, error } = await supabase
    .from("collections")
    .select("id");

  if (error) {
    console.error("Error fetching collections for static generation:", error);
    return [];
  }

  return (
    collections?.map((collection) => ({
      collection_id: collection.id,
    })) || []
  );
}

async function getCollection(id: string): Promise<Collection | null> {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching collection:", error);
    return null;
  }

  return data;
}

async function getUser(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return data;
}

async function getMoments(collectionId: string): Promise<Moment[]> {
  const { data, error } = await supabase
    .from("moments")
    .select("*")
    .eq("collection_id", collectionId)
    .order("started_at", { ascending: true });

  if (error) {
    console.error("Error fetching moments:", error);
    return [];
  }

  return data || [];
}

export default async function CollectionPage({ params }: PageProps) {
  const { collection_id } = await params;
  const collection = await getCollection(collection_id);

  if (!collection) {
    notFound();
  }

  const [user, moments] = await Promise.all([
    getUser(collection.user_id),
    getMoments(collection_id),
  ]);

  return (
    <RomanticTimeline collection={collection} user={user} moments={moments} />
  );
}
