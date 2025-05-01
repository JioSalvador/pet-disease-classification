import React, { useState, useRef } from 'react';
import { Modal,View, Text,StyleSheet,TouchableOpacity,Image,Dimensions,FlatList,NativeSyntheticEvent,NativeScrollEvent,ListRenderItem,} from 'react-native';

interface HealthCheckModalProps {
  visible: boolean;
  onClose: () => void;
}

const HealthCheckModal: React.FC<HealthCheckModalProps> = ({ visible, onClose }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 5;
  const flatListRef = useRef<FlatList>(null);
  const slides = [0, 1, 2, 3, 4];
 
  const renderSlideItem: ListRenderItem<number> = ({ item }) => {
    return (
      <View style={styles.slide}>
        {renderContent()}
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.paginationDot, 
              activeSlide === index ? styles.paginationDotActive : {}
            ]} 
          />
        ))}
      </View>
    );
  };

  const renderContent = () => {
    switch (activeSlide) {
      case 0:
        return (
          <View style={styles.slideContent}>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../assets/images/1.jpg')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.question}>What is health check?</Text>
            <Text style={styles.answer}>
            Health check for your pets is now pretty simple. Use your smarphone to take a picture of their skin to see if there are any signs of abnormalities.These issues can be hard to notice at first. AI helps detect early signs of skin disease, allowing early intervention and better care for your pet.
            </Text>
          </View>
        );
      
      case 1:
        return (
          <View style={styles.slideContent}>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../assets/images/2.jpg')} 
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.question}>How often do we need to check health?</Text>
            <Text style={styles.answer}>
            This enables early treatment, even when there appears to be no immediate problems. This, we recommend to check at least once or twice a week.
            </Text>
          </View>
        );
      
      case 2:
        return (
          <View style={styles.slideContent}>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../assets/images/3.jpg')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.question}>How are the health check analysis results displayed?</Text>
            <Text style={styles.answer}>
            The system analyzes the image and provides the likelihood (in percentage) of any potential skin abnormalities. For results with a high probability of clinical signs, we also provide detailed guidance based on a veterinarian’s instructions to help you manage the situation properly.
            </Text>
          </View>
        );
      
      case 3:
        return (
          <View style={styles.slideContent}>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../assets/images/4.jpg')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.question}>Is this accurate?</Text>
            <Text style={styles.answer}>
            Health checks use AI algorithms developed by computer science students in collaboration with licensed veterinarians to ensure the validity and reliability of the information used in the application. The current prediction accuracy is around atleast 80%
            </Text>
          </View>
        );
      
        case 4:
            return (
              <View style={styles.slideContent}>
                <Text style={styles.question2}>Terms & Condition</Text>
                <Text style={styles.answer}>
                The “Compawnion” Application and its related services are designed for informational and educational purposes only. While the information provided may support the general care and wellness of your pets, it does not constitute medical advice, diagnosis, or treatment.

                {'\n'}{'\n'}This application is not a substitute for professional veterinary care. It does not replace consultations, diagnoses, or medical opinions provided by licensed veterinarians. Regular veterinary checkups remain essential for your pet’s health.
                {'\n'}{'\n'}The app does not function as a medical device, and its findings should not be used for critical or emergency decisions. Users are encouraged to contact a qualified veterinarian for all medical concerns, questions about specific conditions, or if any emergency arises.
                {'\n'}{'\n'}Additional Note:  Even when photographing the same pet, results for abnormal skin signs may vary depending on the lighting, angle, image quality, and environmental conditions. For accurate evaluation, always consult a licensed veterinary professional. 

                </Text>
              </View>
            );
      default:
        return null;
    }
  };

  const goToNextSlide = () => {
    if (activeSlide < totalSlides - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeSlide + 1,
        animated: true
      });
    }
  };

  const goToPrevSlide = () => {
    if (activeSlide > 0) {
      flatListRef.current?.scrollToIndex({
        index: activeSlide - 1,
        animated: true
      });
    }
  };
  
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    if (newIndex !== activeSlide) {
      setActiveSlide(newIndex);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>About Compawnion</Text>
          </View>
          
          <FlatList
            ref={flatListRef}
            data={slides}
            renderItem={renderSlideItem}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate="fast"
            onMomentumScrollEnd={handleScroll}
            initialScrollIndex={activeSlide}
            getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
            })}
            />
          
          {renderPagination()}
        </View>
      </View>
    </Modal>
  );
};

// Screen width for responsive sizing
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 20,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 20,
    zIndex: 10,
    padding: 5,
  },
  backButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  slide: {
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.7,
    marginBottom: 30,
    backgroundColor: '#FFFF',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  question2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  answer: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign:'justify'
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#333',
    width: 20,
    height: 8,
  },
});

export default HealthCheckModal;