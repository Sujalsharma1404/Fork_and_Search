// src/Components/CookingHacks.js
import React, { useState } from 'react';
import './CookingHacks.css';

export default function CookingHacks() {
    const [activeTip, setActiveTip] = useState(null);

    const tips = [
        {
            title: "Perfect Pasta Water",
            content: "Add salt AFTER water boils (not before) for even distribution. Use 1 tbsp per 4 liters for ideal seasoning.",
            emoji: "🍝"
        },
        {
            title: "Avocado Trick",
            content: "Leave the pit in guacamole to prevent browning. The pit reduces oxidation by limiting air exposure.",
            emoji: "🥑"
        },
        {
            title: "Onion Tears Fix",
            content: "Chill onions for 30 minutes before chopping. Cold temperatures slow the release of tear-inducing enzymes.",
            emoji: "🧅"
        },
        {
            title: "Revive Stale Bread",
            content: "Sprinkle water on bread and heat at 180°C for 5-10 minutes. The steam recreates fresh-baked texture.",
            emoji: "🍞"
        },
        {
            title: "Peel Garlic Easily",
            content: "Microwave garlic cloves for 10 seconds. The skins will slip right off.",
            emoji: "🧄"
        },
        {
            title: "Keep Herbs Fresh",
            content: "Wrap herbs in a damp paper towel and store in a ziplock bag in the fridge.",
            emoji: "🌿"
        },
        {
            title: "Prevent Boil-Over",
            content: "Place a wooden spoon across the top of a boiling pot to stop it from bubbling over.",
            emoji: "🥄"
        },
        {
            title: "Rescue Over-Salted Soup",
            content: "Add a raw potato to absorb excess salt while cooking, then remove before serving.",
            emoji: "🥔"
        },
        {
            title: "Crispy Leftover Pizza",
            content: "Reheat pizza in a skillet for a crispy crust instead of using the microwave.",
            emoji: "🍕"
        }
    ];

    return (
        <section className="cooking-hacks">
            <h2>Quick Kitchen Hacks</h2>
            <div className="hacks-container">
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className={`hack-card ${activeTip === index ? 'active' : ''}`}
                        onClick={() => setActiveTip(activeTip === index ? null : index)}
                    >

                        <div className="hack-header">
                            <span className="emoji">{tip.emoji}</span>
                            <h3>{tip.title}</h3>
                            <span className="toggle">{activeTip === index ? '−' : '+'}</span>
                        </div>
                        {activeTip === index && (
                            <div className="hack-content">
                                <p>{tip.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
