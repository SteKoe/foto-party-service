import { TakePicture } from '@/components/TakePicture';
import ContainerLayout from '@/app/ContainerLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kim & Stephan | Mach ein Foto!',
};

export default function Page() {
    return (
        <ContainerLayout>
            <TakePicture />
        </ContainerLayout>
    );
}
