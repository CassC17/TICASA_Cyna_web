import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link, usePathname } from 'expo-router';

const links = [
  { label: 'Tableau de bord', href: '/admin' },
  { label: 'Produits', href: '/admin/products' },
  { label: 'Catégories', href: '/admin/categories' },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <View className="flex-row min-h-screen">
      {/* Barre latérale */}
      <View className="w-64 bg-gray-900 text-white p-4">
        <Text className="text-xl font-bold mb-6">Backoffice</Text>
        {links.map((link) => (
          <Link key={link.href} href={link.href} asChild>
            <Pressable className={`py-2 px-4 rounded ${pathname === link.href ? 'bg-gray-700' : ''}`}>
              <Text className="text-white">{link.label}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      {/* Contenu */}
      <View className="flex-1 p-6">{children}</View>
    </View>
  );
};

export default AdminLayout;
