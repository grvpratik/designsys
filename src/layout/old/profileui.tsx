import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Users, Calendar, Heart, Users2, MessageSquare } from 'lucide-react';

const SocialProfile = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-4 space-y-4">
        <div className="p-2">
          <div className="h-8 w-8 bg-black rounded-lg" />
        </div>
        
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" size="lg">
            <Users className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="lg">
            <MessageSquare className="mr-2 h-4 w-4" />
            Feeds
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="lg">
            <Calendar className="mr-2 h-4 w-4" />
            Event
            <Badge className="ml-auto" variant="destructive">34</Badge>
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="lg">
            <Heart className="mr-2 h-4 w-4" />
            Charity
            <Badge className="ml-auto" variant="destructive">22</Badge>
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="lg">
            <Users2 className="mr-2 h-4 w-4" />
            Friends
          </Button>
        </nav>

        <div className="pt-4">
          <h3 className="text-sm font-medium mb-2">Followings</h3>
          <div className="space-y-2">
            {['Shigeru Minamoto', 'Charlie Zaplin', 'Pope Francis', 'Donald Grump', 'Elvis Parsley'].map((name) => (
              <div key={name} className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <span className="text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input className="pl-10" placeholder="Search" />
          </div>

          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-200" />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold">Fredy Mercury</h1>
                  <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <div className="flex space-x-4 text-sm text-gray-600">
                  <span><strong>1.25k</strong> Followers</span>
                  <span><strong>455</strong> Followings</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              Alzea Arafat, a Indonesian based senior UI/UX designer with more than 10 years experience in various industry from early stage startups to unicorns. His hobby is playing games.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="events">
            <TabsList>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="room">Room</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <Card key={item}>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4" />
                      <h3 className="font-medium">Event Title</h3>
                      <p className="text-sm text-gray-600">@ Central Park, NYC</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SocialProfile;