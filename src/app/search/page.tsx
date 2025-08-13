"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import VantaFog from "@/components/VantaFog";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { AuroraText } from "@/components/magicui/aurora-text";

interface GuidePlace {
    name: string;
    location: string;
    description: string;
    tip: string;
}

interface GuideResponse {
    guide_content: string | GuidePlace[]; // allow either raw text or parsed array
    timestamp: string;
}

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

interface FavoritesResponse {
    favorites: { City: string; "Favorite Place": string }[];
    count: number;
}

const API_BASE = "https://personalized-guide-977121587860.asia-south2.run.app";

export default function TravelGuidePage() {
    const [city, setCity] = useState("");
    const [guide, setGuide] = useState<GuideResponse | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState("");
    const [favorites, setFavorites] = useState<FavoritesResponse | null>(null);
    const [loadingGuide, setLoadingGuide] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    // Load favorites on mount
    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const res = await axios.get<FavoritesResponse>(
                `${API_BASE}/favorites`
            );
            setFavorites(res.data);
        } catch (err) {
            console.error("Failed to fetch favorites", err);
        }
    };

    const handleGenerateGuide = async () => {
        if (!city.trim()) return;
        setLoadingGuide(true);
        try {
            const res = await axios.post<{
                guide_content: string;
                timestamp: string;
            }>(`${API_BASE}/guide`, { city });

            console.log(res);
            

            // Parse numbered list from Amelie into structured places
            const raw = res.data.guide_content;
            const placeRegex =
                /\d+\.\s*(?:[\p{Emoji}\u200d]+)?\s*\*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*\*\*Pro Tip:\*\*\s*(.+?)(?=\d+\.|$)/gsu;

            const places = [];
            let match;
            while ((match = placeRegex.exec(raw)) !== null) {
                places.push({
                    name: match[1].trim(),
                    location: match[2].trim(),
                    description: match[3].trim(),
                    tip: match[4].trim(),
                });
            }

            setGuide({
                ...res.data,
                guide_content: places, // store as array instead of raw text
            });
            setChatMessages([]);
        } catch (err) {
            console.error("Error fetching guide", err);
        } finally {
            setLoadingGuide(false);
        }
    };

    const handleSendChat = async () => {
    if (!chatInput.trim() || !city) return;

    const newMessages: ChatMessage[] = [
        ...chatMessages,
        { role: "user", content: chatInput },
    ];
    setChatMessages(newMessages);
    setChatInput("");
    setLoadingChat(true);

    try {
        const res = await axios.post(`${API_BASE}/chat`, {
            messages: newMessages,
            city_context: city,
        });
        setChatMessages([
            ...newMessages,
            { role: "assistant", content: res.data.response },
        ]);
    } catch (err) {
        console.error("Chat failed", err);
    } finally {
        setLoadingChat(false);
    }
};


    const handleSaveFavorite = async (placeName: string) => {
        try {
            const res = await axios.post(`${API_BASE}/favorites`, {
                city,
                place_name: placeName,
            });
            console.log(res.data.message);
            fetchFavorites();
        } catch (err) {
            console.error("Save favorite failed", err);
        }
    };

    const handleClearFavorites = async () => {
        try {
            await axios.delete(`${API_BASE}/favorites`);
            fetchFavorites();
        } catch (err) {
            console.error("Clear favorites failed", err);
        }
    };

    return (
        <div>
            <VantaFog />
            <div className="max-w-5xl mx-auto p-6 mt-10 space-y-6">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
                    Your <AuroraText>Personalized Travel Guide</AuroraText>
                </h1>

                {/* City Input */}
                <div className="flex gap-2 mt-6">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="p-4 border rounded-md flex-1"
                        placeholder="Enter city name (e.g., Paris)"
                    />
                </div>
                <RainbowButton
                    onClick={handleGenerateGuide}
                    disabled={loadingGuide}
                >
                    {loadingGuide ? "Loading..." : "Get Guide"}
                </RainbowButton>

                {/* Guide Display */}
                {guide && Array.isArray(guide.guide_content) && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            🗺️ Guide for {city} ({guide.timestamp})
                        </h2>
                        {guide.guide_content.map((place, idx) => (
                            <div
                                key={idx}
                                className="p-4 border rounded-lg bg-white shadow-sm space-y-2"
                            >
                                <h3 className="text-lg font-bold">
                                    {idx + 1}. {place.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {place.location}
                                </p>
                                <p>{place.description}</p>
                                <p className="text-sm italic text-green-700">
                                    💡 {place.tip}
                                </p>
                                <button
                                    onClick={() =>
                                        handleSaveFavorite(place.name)
                                    }
                                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                                >
                                    ⭐ Save to Favorites
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Chat UI */}
                {guide && (
                    <div className="mt-6 border p-4 rounded-md bg-white">
                        <h3 className="text-lg font-semibold mb-2">
                            💬 Chat with your AI guide
                        </h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto border p-2 rounded">
                            {chatMessages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`p-2 rounded ${
                                        msg.role === "user"
                                            ? "bg-blue-100 text-blue-900"
                                            : "bg-gray-100 text-gray-900"
                                    }`}
                                >
                                    <strong>
                                        {msg.role === "user" ? "You" : "Amelie"}
                                        :
                                    </strong>{" "}
                                    {msg.content}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 my-2">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                className="p-2 border rounded flex-1"
                                placeholder="Ask about a place..."
                            />
                        </div>
                        <RainbowButton
                            onClick={handleSendChat}
                            disabled={loadingChat}
                        >
                            {loadingChat ? "..." : "Send"}
                        </RainbowButton>
                    </div>
                )}

                {/* Favorites */}
                <div className="mt-6 border p-4 rounded-md bg-white">
                    <h3 className="text-lg font-semibold">⭐ Favorites</h3>
                    {favorites?.favorites?.length ? (
                        <ul className="list-disc list-inside">
                            {favorites.favorites.map((fav, idx) => (
                                <li key={idx}>
                                    {fav.City} - {fav["Favorite Place"]}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No favorites saved.</p>
                    )}
                </div>
                <RainbowButton
                    variant="outline"
                    onClick={handleClearFavorites}
                    className="mt-2"
                >
                    Clear All
                </RainbowButton>

                {/* Save Favorite Input */}
                {guide && (
                    <div className="mt-4 flex gap-2">
                        <input
                            type="text"
                            placeholder="Place to save (exact name)"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSaveFavorite(
                                        (e.target as HTMLInputElement).value
                                    );
                                    (e.target as HTMLInputElement).value = "";
                                }
                            }}
                            className="p-2 border rounded flex-1"
                        />
                <RainbowButton
                    onClick={() => {
                        const input = document.querySelector<HTMLInputElement>(
                            "input[placeholder='Place to save (exact name)']"
                        );
                        if (input && input.value.trim()) {
                            handleSaveFavorite(input.value.trim());
                            input.value = "";
                        }
                    }}
                >
                    Save Favorite
                </RainbowButton>
                    </div>
                )}
            </div>
        </div>
    );
}
