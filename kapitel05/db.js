self.db = new Dexie('MeineDatenbank');
self.db.version(1).stores({ artikel: '++id, name, ean' });
self.db.on('populate', () => {
    db.artikel.add({ name: 'Bleistift', ean: 12345678 });
});