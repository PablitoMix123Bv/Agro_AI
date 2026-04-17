import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { theme } from '../../theme/theme';
import { Card } from '../../components/Card';
import { LineChart, BarChart } from 'lucide-react-native';

export const StatsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Estadísticas y Análisis</Text>
        </View>

        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <LineChart color={theme.colors.primary} size={24} />
            <Text style={styles.chartTitle}>Humedad Histórica</Text>
          </View>
          <View style={styles.placeholderChart}>
            <Text style={styles.placeholderText}>[ Gráfico de Humedad ]</Text>
          </View>
        </Card>

        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <BarChart color={theme.colors.accent} size={24} />
            <Text style={styles.chartTitle}>Consumo de Agua (Semana)</Text>
          </View>
          <View style={styles.placeholderChart}>
            <Text style={styles.placeholderText}>[ Gráfico de Barras de Consumo ]</Text>
          </View>
        </Card>

        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryValue}>125 L</Text>
            <Text style={styles.summaryLabel}>Ahorro IA (Mes)</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryValue}>98%</Text>
            <Text style={styles.summaryLabel}>Salud Cultivo</Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
  },
  chartCard: {
    marginBottom: theme.spacing.lg,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  chartTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
  },
  placeholderChart: {
    height: 150,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: theme.colors.textSecondary,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  summaryValue: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
  },
  summaryLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    marginTop: theme.spacing.xs,
  }
});
