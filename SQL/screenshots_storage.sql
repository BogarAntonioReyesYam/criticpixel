-- Crear bucket para screenshots
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('screenshots', 'screenshots', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Política: usuarios autenticados pueden subir
CREATE POLICY "screenshots_upload_auth" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'screenshots' AND auth.role() = 'authenticated');

-- Política: todos pueden ver
CREATE POLICY "screenshots_select_public" ON storage.objects
  FOR SELECT USING (bucket_id = 'screenshots');

-- Política: usuarios pueden borrar sus propios archivos
CREATE POLICY "screenshots_delete_own" ON storage.objects
  FOR DELETE USING (bucket_id = 'screenshots' AND auth.uid()::text = (storage.foldername(name))[1]);
