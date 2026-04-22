import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const ProgressBar = ({ 
  progress = 0, 
  color = '#4CAF50', 
  backgroundColor = '#E0E0E0',
  height = 20,
  showPercentage = true 
}) => {
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthAnim = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const percentageText = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { height: height + 8 }]}>
      {/* VIEW 1: Fundo FIXO */}
      <View 
        style={[
          styles.backgroundBar,
          {
            height: height,
            borderRadius: height / 2,
            backgroundColor: backgroundColor,
          }
        ]}
      />
      
      {/* VIEW 2: Progresso VARIÁVEL (animado) */}
      <Animated.View 
        style={[
          styles.progressBar,
          {
            height: height,
            borderRadius: height / 2,
            backgroundColor: color,
            width: widthAnim,
          }
        ]}
      />

      {/* Porcentagem animada */}
      {showPercentage && (
        <Animated.Text style={[
          styles.percentage,
          { 
            color: color,
            fontSize: height / 2.5,
            lineHeight: height + 4,
          }
        ]}>
          {percentageText}
        </Animated.Text>
      )}
    </View>
  );
};

const App = () => {
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgresso(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (Math.random() * 8 + 2);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.app}>
      <Text style={styles.titulo}>🔄 LOADING...</Text>
      
      <ProgressBar 
        progress={progresso}
        color="#2196F3"
        height={25}
        showPercentage={true}
      />
      
      <Text style={styles.percent}>{Math.round(progresso)}%</Text>
      
      {/* Exemplos de uso */}
      <Text style={styles.exemplo}>📱 Exemplos:</Text>
      
      <ProgressBar progress={75} color="#4CAF50" height={15} />
      <ProgressBar progress={25} color="#FF9800" height={15} />
      <ProgressBar progress={90} color="#F44336" height={15} />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    padding: 30,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  percent: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#2196F3',
  },
  exemplo: {
    fontSize: 16,
    marginTop: 40,
    marginBottom: 20,
    color: '#666',
  },
  container: {
    width: '100%',
    maxWidth: screenWidth - 60,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundBar: {
    width: '100%',
    position: 'absolute',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  percentage: {
    position: 'absolute',
    right: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default App;