"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Plus, Search, Filter, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminCourses() {
    const courses = [
        { id: "CS301", name: "Data Structures", dept: "CS", credits: 4, faculty: "Dr. Smith", status: "Active" },
        { id: "CS302", name: "Operating Systems", dept: "CS", credits: 4, faculty: "Dr. Richard", status: "Active" },
        { id: "ME201", name: "Thermodynamics", dept: "ME", credits: 3, faculty: "Prof. John", status: "Active" },
        { id: "EE101", name: "Network Theory", dept: "EE", credits: 4, faculty: "Ms. Sarah", status: "Paused" },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-purple-900 font-heading text-azure-600">Course Management</h1>
                        <p className="text-purple-400 font-medium">Manage academic offerings and curriculum</p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 rounded-xl px-6 h-12 font-bold shadow-lg shadow-purple-200">
                        <Plus className="w-5 h-5 mr-2" /> Add New Course
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
                        <Input placeholder="Search course by name or ID..." className="pl-10 rounded-xl border-purple-50 bg-white" />
                    </div>
                    <Button variant="outline" className="rounded-xl border-purple-50 text-purple-600">
                        <Filter className="w-4 h-4 mr-2" /> Filter Dept
                    </Button>
                </div>

                <Card className="border-0 shadow-lg shadow-purple-500/5 bg-white overflow-hidden">
                    <CardHeader className="bg-purple-50/50 border-b border-purple-50">
                        <CardTitle className="text-purple-900 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-purple-500" /> Active Course Catalog
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-purple-50/20">
                                <TableRow>
                                    <TableHead className="font-black text-[10px] uppercase text-purple-400 tracking-widest pl-8">Course ID</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase text-purple-400 tracking-widest pl-8">Name</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase text-purple-400 tracking-widest">Department</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase text-purple-400 tracking-widest">Credits</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase text-purple-400 tracking-widest">Faculty</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase text-purple-400 tracking-widest">Status</TableHead>
                                    <TableHead className="pr-8"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow key={course.id} className="hover:bg-purple-50/30 transition-colors group">
                                        <TableCell className="font-bold text-purple-900 pl-8">{course.id}</TableCell>
                                        <TableCell className="font-medium text-purple-600 pl-8">{course.name}</TableCell>
                                        <TableCell className="text-purple-500 font-semibold">{course.dept}</TableCell>
                                        <TableCell className="text-purple-900 font-bold">{course.credits}</TableCell>
                                        <TableCell className="text-purple-600">{course.faculty}</TableCell>
                                        <TableCell>
                                            <Badge className={course.status === 'Active' ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"}>
                                                {course.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <Button variant="ghost" size="icon" className="rounded-full text-purple-400 hover:text-purple-600">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
