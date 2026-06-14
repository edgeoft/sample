DROP POLICY IF EXISTS "Anyone can submit a booking" ON public.bookings;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT bookings_phone_len CHECK (char_length(phone) BETWEEN 5 AND 32),
  ADD CONSTRAINT bookings_email_len CHECK (email IS NULL OR char_length(email) <= 254),
  ADD CONSTRAINT bookings_address_len CHECK (address IS NULL OR char_length(address) <= 300),
  ADD CONSTRAINT bookings_service_type_allowed CHECK (service_type IN ('General Pest Control','Bird Mesh Netting','Possum Removal','Termite Inspection','Rodent Control','Cockroach Treatment','Commercial Solutions','Other')),
  ADD CONSTRAINT bookings_notes_len CHECK (notes IS NULL OR char_length(notes) <= 1000),
  ADD CONSTRAINT bookings_status_allowed CHECK (status IN ('new','contacted','scheduled','completed','cancelled'));

CREATE POLICY "Public can submit a booking"
  ON public.bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(phone) BETWEEN 5 AND 32
    AND service_type IN ('General Pest Control','Bird Mesh Netting','Possum Removal','Termite Inspection','Rodent Control','Cockroach Treatment','Commercial Solutions','Other')
    AND status = 'new'
  );