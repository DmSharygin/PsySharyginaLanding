"use client";

import { useState, useEffect } from 'react';

interface CookieBannerProps {
  onOpenPrivacy?: () => void;
}

export default function CookieBanner({ onOpenPrivacy }: CookieBannerProps) {
    const [isAccepted, setIsAccepted] = useState(true);

    useEffect(() => {
        // Проверяем, давал ли пользователь согласие ранее
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setIsAccepted(false);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsAccepted(true);
    };

    if (isAccepted) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200/80 transition-all text-stone-800 text-sm">
            <div className="flex flex-col gap-3">
                <p className="leading-relaxed text-xs md:text-sm">
                    Мы используем файлы cookie для корректной работы сайта и отображения интерактивной карты.{' '}
                    Подробнее — в нашей{' '}
                    <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="underline hover:no-underline transition-colors hover:text-[#C6967B]"
                    >
                        политике конфиденциальности
                    </button>
                    .
                </p>
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={handleAccept}
                        className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-xl transition-colors active:scale-95"
                    >
                        Понятно
                    </button>
                </div>
            </div>
        </div>
    );
}