"use client"

import React from 'react'
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from '@/components/ui/card';
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import BackButton from '@/components/auth/back-button';

interface CardWrapperProps {
    children: React.ReactNode;
    headerLable: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean
}


export function CardWrapper({
    children,
    headerLable,
    backButtonHref,
    backButtonLabel,
    showSocial
}: CardWrapperProps) {
  return (
    <div>
      <Card className='w-[400px] shadow-md'>
        <CardHeader>
            <Header label={headerLable}/>
        </CardHeader>
        
        <CardContent>
            {children}
        </CardContent>
        
        {showSocial && (
            <CardFooter>
                <Social />
            </CardFooter>
        )}

        <CardFooter>
            <BackButton 
                label={backButtonLabel}
                href= {backButtonHref}
            />
        </CardFooter>
      </Card>
    </div>
  )
}
