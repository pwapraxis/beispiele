self.db = new Dexie('MeineDatenbank');
self.db.version(1).stores({
  artikel: '++id, name, ean'
});
self.db.on('populate', async () => {
    try {
        await db.artikel.add({ name: 'Bleistift', ean: 12345678 });
    } catch (err) {
        console.error(err);
    }
});