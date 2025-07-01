
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  BookOpen, 
  Calculator, 
  Beaker, 
  Globe, 
  Palette, 
  Music, 
  Trophy,
  Calendar,
  BarChart3,
  Settings,
  User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const subjects = [
  { title: "Mathematics", icon: Calculator, color: "text-blue-600" },
  { title: "Science", icon: Beaker, color: "text-green-600" },
  { title: "English", icon: BookOpen, color: "text-purple-600" },
  { title: "History", icon: Globe, color: "text-amber-600" },
  { title: "Art", icon: Palette, color: "text-pink-600" },
  { title: "Music", icon: Music, color: "text-indigo-600" },
];

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Test Schedule", url: "/schedule", icon: Calendar },
  { title: "Achievements", url: "/achievements", icon: Trophy },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          {!collapsed && (
            <div>
              <span className="text-lg font-roboto-slab font-bold text-primary">TestTrack Pro</span>
              <Badge variant="secondary" className="ml-2 text-xs">Student</Badge>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink 
                      to={item.url} 
                      className="flex items-center space-x-2 w-full enhanced-glow"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Subjects */}
        <SidebarGroup>
          <SidebarGroupLabel>Subjects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {subjects.map((subject) => (
                <SidebarMenuItem key={subject.title}>
                  <SidebarMenuButton className="morphing-shadow">
                    <div className="flex items-center space-x-2 w-full">
                      <subject.icon className={`h-4 w-4 ${subject.color}`} />
                      {!collapsed && (
                        <span className="flex-1">{subject.title}</span>
                      )}
                      {!collapsed && (
                        <Badge variant="outline" className="text-xs">
                          {Math.floor(Math.random() * 5) + 1}
                        </Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-2 space-y-3">
                <div className="p-3 rounded-lg bg-muted/50 gradient-border">
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                  <div className="text-2xl font-bold text-primary">87%</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 gradient-border">
                  <div className="text-sm text-muted-foreground">Tests Completed</div>
                  <div className="text-2xl font-bold text-green-600">12</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 gradient-border">
                  <div className="text-sm text-muted-foreground">Upcoming</div>
                  <div className="text-2xl font-bold text-amber-600">3</div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
