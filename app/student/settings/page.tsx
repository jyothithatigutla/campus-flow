"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, User, Bell, Shield } from "lucide-react";

export default function StudentSettings() {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 space-y-8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                <h1 className="text-3xl font-bold text-purple-900 font-heading">Settings</h1>

                <div className="grid gap-6">
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <User className="w-5 h-5 text-purple-500" /> Account Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input defaultValue="Jyothic H" className="rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Student ID</Label>
                                    <Input defaultValue="CS20210045" disabled className="rounded-xl opacity-70" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Bell className="w-5 h-5 text-purple-500" /> Notifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive updates about attendance</p>
                                </div>
                                <div className="w-10 h-5 bg-purple-600 rounded-full cursor-pointer" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Shield className="w-5 h-5 text-purple-500" /> Security & Password
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" className="rounded-xl border-purple-50 bg-purple-50/10" placeholder="••••••••" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" className="rounded-xl border-purple-50 bg-purple-50/10" placeholder="••••••••" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input id="confirm-password" type="password" className="rounded-xl border-purple-50 bg-purple-50/10" placeholder="••••••••" />
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full md:w-auto rounded-xl border-purple-100 text-purple-600 font-bold hover:bg-purple-50 transition-all">
                                Update Password
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button className="bg-purple-600 hover:bg-purple-700 rounded-xl px-8 h-12 font-bold shadow-lg shadow-purple-200">
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
