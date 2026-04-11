import aleleImage from './alele.jpeg';
import kangetaImage from './kangeta.jpeg';
import kizaImage from './Kiza.jpeg';
import kolomboImage from './kolombo.jpeg';

export const miraaGrades = ['Kangeta', 'Alele', 'Giza', 'Lomboko'];

export const miraaTypeMap = {
  Kangeta: {
    displayName: 'Kangeta',
    image: kangetaImage,
    description: 'Premium grade miraa from the highlands.',
  },
  Alele: {
    displayName: 'Alele',
    image: aleleImage,
    description: 'Premium Alele miraa with balanced flavor.',
  },
  Giza: {
    displayName: 'Kiza',
    image: kizaImage,
    description: 'Rare Kiza variety miraa with distinctive quality.',
  },
  Lomboko: {
    displayName: 'Kolombo',
    image: kolomboImage,
    description: 'Traditional Kolombo grade miraa with reliable supply.',
  },
};

export const getMiraaDisplayName = (grade) => miraaTypeMap[grade]?.displayName || grade;
export const getMiraaImage = (grade) => miraaTypeMap[grade]?.image;
export const getMiraaDescription = (grade) => miraaTypeMap[grade]?.description || '';
