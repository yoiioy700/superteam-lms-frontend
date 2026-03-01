"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { User, Mail, Shield, Bell, Key, Wallet } from "lucide-react";

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col h-full bg-[#0A0A0A]">
                <DashboardHeader title="Account Settings" />

                <div className="flex-1 overflow-auto p-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div>
                            <h2 className="text-2xl font-playfair text-[#FAF8F5] mb-2">Profile & Security</h2>
                            <p className="text-[#888888] font-manrope text-sm">Manage your Superteam Academy account settings and preferences.</p>
                        </div>

                        {/* Settings Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* Left Navigation col - omitted for simplicity, using stacked cards */}
                            <div className="md:col-span-3 space-y-6">

                                {/* Personal Info */}
                                <div className="p-6 border border-[#1F1F1F] bg-[#0F0F0F] rounded-lg">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-[#1E1E1E] rounded-md">
                                            <User className="w-5 h-5 text-[#C9A962]" />
                                        </div>
                                        <h3 className="text-lg font-playfair text-[#FAF8F5]">Personal Information</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-manrope text-[#888888] uppercase tracking-wider">Username</label>
                                                <input type="text" defaultValue="crypto_learner" className="w-full bg-[#1E1E1E] border border-[#333] rounded-md px-4 py-2 text-[#FAF8F5] focus:outline-none focus:border-[#C9A962] font-manrope" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-manrope text-[#888888] uppercase tracking-wider">Email Address</label>
                                                <input type="email" defaultValue="student@superteam.fun" className="w-full bg-[#1E1E1E] border border-[#333] rounded-md px-4 py-2 text-[#FAF8F5] focus:outline-none focus:border-[#C9A962] font-manrope" />
                                            </div>
                                        </div>
                                        <button className="px-6 py-2 bg-[#1E1E1E] hover:bg-[#2A2A2A] text-[#FAF8F5] border border-[#333] transition rounded-md font-manrope text-sm mt-4">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>

                                {/* Wallet Settings */}
                                <div className="p-6 border border-[#1F1F1F] bg-[#0F0F0F] rounded-lg">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-[#1E1E1E] rounded-md">
                                            <Wallet className="w-5 h-5 text-[#C9A962]" />
                                        </div>
                                        <h3 className="text-lg font-playfair text-[#FAF8F5]">Connected Wallets</h3>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-md border border-[#333]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
                                            <div>
                                                <p className="text-[#FAF8F5] font-manrope text-sm">Phantom Wallet (Primary)</p>
                                                <p className="text-[#888888] font-manrope text-xs">9YZ4...c8vL</p>
                                            </div>
                                        </div>
                                        <button className="text-red-400 hover:text-red-300 font-manrope text-sm transition">Disconnect</button>
                                    </div>
                                    <button className="px-6 py-2 bg-primary text-[#0F0F0F] hover:bg-[#E6D199] transition rounded-md font-manrope text-sm font-bold mt-4">
                                        Link Another Wallet
                                    </button>
                                </div>

                                {/* Notifications */}
                                <div className="p-6 border border-[#1F1F1F] bg-[#0F0F0F] rounded-lg">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-[#1E1E1E] rounded-md">
                                            <Bell className="w-5 h-5 text-[#C9A962]" />
                                        </div>
                                        <h3 className="text-lg font-playfair text-[#FAF8F5]">Notification Preferences</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[#FAF8F5] font-manrope text-sm">Course Updates</p>
                                                <p className="text-[#888888] font-manrope text-xs">Receive emails when new courses are published.</p>
                                            </div>
                                            <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                                                <div className="w-4 h-4 bg-[#0F0F0F] rounded-full absolute right-1 top-1"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-[#1E1E1E]">
                                            <div>
                                                <p className="text-[#FAF8F5] font-manrope text-sm">Bounty Alerts</p>
                                                <p className="text-[#888888] font-manrope text-xs">Get notified about new Superteam earn opportunities.</p>
                                            </div>
                                            <div className="w-11 h-6 bg-[#1E1E1E] rounded-full relative cursor-pointer">
                                                <div className="w-4 h-4 bg-[#888] rounded-full absolute left-1 top-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
