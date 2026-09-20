const ADMIN_KEY = 'besthand_admin';

export const isAdminLoggedIn = () => {
  return localStorage.getItem(ADMIN_KEY) === 'true';
};

export const setAdminLoggedIn = (status) => {
  if (status) {
    localStorage.setItem(ADMIN_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_KEY);
  }
};

export const exportProductsJSON = (products) => {
  const dataStr = JSON.stringify(products, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'products.json';
  a.click();
  URL.revokeObjectURL(url);
};
