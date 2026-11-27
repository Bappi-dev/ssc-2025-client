import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import heroImage from '../../../public/image/Vibrant School Group Portrait Under Tree.png';

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-[#07152fe3] text-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero Image */}
        <div className="relative mb-12 h-64 md:h-96">
          <Image
            src={heroImage}
            alt="School batch 2025"
            fill
            className="object-cover rounded-3xl opacity-30"
            priority
          />
        </div>
        {/* About Card */}
        <Card className="bg-[#10264A] border-[#D4AF37]/30">
          <CardHeader className="flex flex-col items-center space-y-2">
            <Badge variant="secondary" className="bg-[#D4AF37]/20 text-[#F6D978]">
              About SSC 2025 Batch
            </Badge>
            <CardTitle className="text-3xl font-bold text-white">
              Sherua Adarsha High School
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center text-slate-300">
            <p className="text-lg">
              One school, one batch, endless memories. Our 2025 batch is a community of over 50
              students sharing a journey of learning, friendship, and growth.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="default">
                <a href="/students">Meet Our Students</a>
              </Button>
              <Button className={"text-black"} variant="outline">
                <a href="/memories">Explore Memories</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutPage;
