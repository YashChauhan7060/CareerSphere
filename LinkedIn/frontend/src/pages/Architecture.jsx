import React, { useState } from 'react';
import { Server, Database, Lock, Upload, Users, FileText, Image, Bell, Search, Layout, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

function Architecture() {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const navigate = useNavigate();

  const layers = {
    frontend: {
      title: "Frontend Layer",
      color: "from-blue-500 to-indigo-600",
      icon: Layout,
      components: [
        { name: "React Components", desc: "Home, Profile, EditProfile, Post, Nav" },
        { name: "Context API", desc: "userDataContext, authDataContext" },
        { name: "State Management", desc: "useState, useContext, useRef" },
        { name: "UI Features", desc: "Dark/Light mode, Responsive design" }
      ]
    },
    backend: {
      title: "Backend Layer",
      color: "from-green-500 to-emerald-600",
      icon: Server,
      components: [
        { name: "REST API", desc: "Express.js endpoints" },
        { name: "Authentication", desc: "Cookie-based sessions" },
        { name: "File Upload", desc: "Multer for images" },
        { name: "Routes", desc: "/api/user, /api/post" }
      ]
    },
    database: {
      title: "Database Layer",
      color: "from-purple-500 to-pink-600",
      icon: Database,
      components: [
        { name: "User Collection", desc: "Profile, credentials, connections" },
        { name: "Post Collection", desc: "Content, images, likes, comments" },
        { name: "Relationships", desc: "User-Post associations" },
        { name: "Media Storage", desc: "Profile/cover images" }
      ]
    }
  };

  const features = [
    { icon: Users, name: "User Profiles", desc: "Complete profile management" },
    { icon: FileText, name: "Posts", desc: "Create and share content" },
    { icon: Image, name: "Media Upload", desc: "Images for posts and profiles" },
    { icon: Bell, name: "Suggestions", desc: "User recommendations" },
    { icon: Search, name: "Search", desc: "Find users and content" },
    { icon: Lock, name: "Auth", desc: "Secure authentication" }
  ];

  return (
    <>
      <Nav />
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-[80px] pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 flex items-center justify-center transition-all border border-white/20"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                System Architecture
              </h1>
              <p className="text-blue-200 text-lg mt-1">LinkedIn-inspired professional networking platform</p>
            </div>
          </div>

          {/* Architecture Layers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Object.entries(layers).map(([key, layer]) => {
              const Icon = layer.icon;
              const isSelected = selectedLayer === key;
              
              return (
                <div
                  key={key}
                  onClick={() => setSelectedLayer(isSelected ? null : key)}
                  className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                    isSelected ? 'border-white scale-105' : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${layer.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{layer.title}</h3>
                  
                  <div className={`space-y-3 transition-all duration-300 ${isSelected ? 'opacity-100 max-h-96' : 'opacity-70 max-h-0 overflow-hidden'}`}>
                    {layer.components.map((component, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="font-semibold text-blue-300">{component.name}</div>
                        <div className="text-sm text-blue-200/70">{component.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Data Flow */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12 border-2 border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              Data Flow Architecture
            </h3>
            
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-blue-500/20 border border-blue-400 rounded-lg px-4 py-2 text-blue-300 font-semibold min-w-[140px] text-center">
                  User Action
                </div>
                <div className="text-white text-2xl">→</div>
                <div className="bg-green-500/20 border border-green-400 rounded-lg px-4 py-2 text-green-300 font-semibold min-w-[140px] text-center">
                  React Component
                </div>
                <div className="text-white text-2xl">→</div>
                <div className="bg-purple-500/20 border border-purple-400 rounded-lg px-4 py-2 text-purple-300 font-semibold min-w-[140px] text-center">
                  API Call (Axios)
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-orange-500/20 border border-orange-400 rounded-lg px-4 py-2 text-orange-300 font-semibold min-w-[140px] text-center">
                  Backend API
                </div>
                <div className="text-white text-2xl">→</div>
                <div className="bg-pink-500/20 border border-pink-400 rounded-lg px-4 py-2 text-pink-300 font-semibold min-w-[140px] text-center">
                  Database Query
                </div>
                <div className="text-white text-2xl">→</div>
                <div className="bg-indigo-500/20 border border-indigo-400 rounded-lg px-4 py-2 text-indigo-300 font-semibold min-w-[140px] text-center">
                  Response
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12 border-2 border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all">
                    <Icon className="w-8 h-8 text-blue-400 mb-2" />
                    <div className="font-semibold text-white">{feature.name}</div>
                    <div className="text-sm text-blue-200/70">{feature.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Technology Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['React 18', 'Tailwind CSS', 'Axios', 'Context API', 'Express.js', 'MongoDB', 'Multer', 'Cookie Auth'].map((tech, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg px-4 py-3 text-center border border-white/10 hover:border-white/30 transition-all">
                  <span className="text-blue-300 font-semibold">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Architecture;