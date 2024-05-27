import { Metadata } from 'next';
import PicturesPageComponent from '@/components/PicturesPageComponent';

export const metadata: Metadata = {
    title: 'Kim & Stephan | Mach ein Foto!',
};

export default function Page() {
    return <PicturesPageComponent />;
}
