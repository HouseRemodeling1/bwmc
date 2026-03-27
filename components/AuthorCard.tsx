import Image from "next/image";
import { Linkedin, Twitter, Instagram, Globe } from "lucide-react";

interface Author {
  name: string; bio: string; avatar: string; role: string;
  linkedin?: string; twitter?: string; instagram?: string; website?: string;
}

export default function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="border-t border-gray-100 mt-12 pt-10">
      <div className="flex flex-col sm:flex-row gap-6 items-start bg-gray-50 rounded-2xl p-6 transition-all hover:shadow-md">
        {author.avatar ? (
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image 
              src={author.avatar} 
              alt={author.name} 
              fill
              className="rounded-full object-cover border-4 border-white shadow-md" 
            />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-royal-blue flex items-center justify-center text-white text-3xl font-bold flex-shrink-0 shadow-md">
            {author.name[0]}
          </div>
        )}
        <div className="flex-1">
          <p className="text-xs font-bold text-royal-blue uppercase tracking-widest mb-1">Written by</p>
          <h3 className="text-xl font-bold text-navy">{author.name}</h3>
          <p className="text-sm text-royal-blue font-medium mb-3">{author.role}</p>
          <p className="text-gray-600 leading-relaxed text-sm">{author.bio}</p>
          <div className="flex items-center gap-3 mt-4">
            {author.linkedin && (
              <a href={author.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg border border-gray-200 hover:border-royal-blue hover:text-royal-blue transition-all text-gray-500 shadow-sm"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {author.twitter && (
              <a href={author.twitter} target="_blank" rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg border border-gray-200 hover:border-royal-blue hover:text-royal-blue transition-all text-gray-500 shadow-sm"
                title="Twitter / X Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {author.instagram && (
              <a href={author.instagram} target="_blank" rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg border border-gray-200 hover:border-pink-500 hover:text-pink-500 transition-all text-gray-500 shadow-sm"
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {author.website && (
              <a href={author.website} target="_blank" rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg border border-gray-200 hover:border-royal-blue hover:text-royal-blue transition-all text-gray-500 shadow-sm"
                title="Personal Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
