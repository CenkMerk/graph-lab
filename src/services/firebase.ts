import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  QueryConstraint
} from 'firebase/firestore';
import { Graph } from '../types/graph';
import { matrixHelpers } from '../utils/matrixHelpers';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Graf servisleri
export const graphService = {
  // Yeni graf ekleme
  async create(graphData: Omit<Graph, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      // Matrisi sıkıştırılmış formatta sakla
      const compressedMatrix = matrixHelpers.compressMatrix(graphData.matrix);
      
      const docRef = await addDoc(collection(db, 'graphs'), {
        ...graphData,
        matrix: compressedMatrix, // Sıkıştırılmış matris
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Graf oluşturulurken hata:', error);
      throw error;
    }
  },

  // Kullanıcının graflarını getirme
  async getUserGraphs(userId: string): Promise<Graph[]> {
    try {
      // Sorgu kısıtlamalarını ayrı ayrı oluştur
      const constraints: QueryConstraint[] = [
        where('userId', '==', userId)
      ];

      // Opsiyonel olarak sıralama ekle
      try {
        constraints.push(orderBy('createdAt', 'desc'));
      } catch (error) {
        console.warn('Sıralama yapılamadı, indeks gerekebilir:', error);
      }

      const q = query(
        collection(db, 'graphs'),
        ...constraints
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          matrix: matrixHelpers.decompressMatrix(data.matrix, data.size),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        };
      }) as Graph[];
    } catch (error) {
      console.error('Graflar getirilirken hata:', error);
      throw error;
    }
  },

  // Graf silme
  async delete(graphId: string) {
    try {
      await deleteDoc(doc(db, 'graphs', graphId));
    } catch (error) {
      console.error('Graf silinirken hata:', error);
      throw error;
    }
  }
}; 