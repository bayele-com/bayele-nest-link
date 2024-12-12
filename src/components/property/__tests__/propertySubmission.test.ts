import { supabase } from "@/lib/supabase";
import { PropertyType, City, ManagementType, PropertyStatus } from "@/integrations/supabase/types/enums";

export const testPropertySubmission = async () => {
  console.log('Starting property submission test...');

  // Test data
  const testProperty = {
    title: "Test Property Listing",
    description: "This is a test property listing with detailed description for testing purposes.",
    type: PropertyType.APARTMENT,
    city: City.YAOUNDE,
    location: "Test Location",
    price: 150000,
    bedrooms: 2,
    bathrooms: 1,
    management_type: ManagementType.SELF,
    phone: "+237600000000",
    whatsapp: "+237600000000",
  };

  try {
    console.log('Submitting test property:', testProperty);
    
    // Test property insertion
    const { data: insertedProperty, error: insertError } = await supabase
      .from('properties')
      .insert([{
        ...testProperty,
        status: PropertyStatus.PENDING,
        images: [],
        amenities: [],
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Property insertion failed:', insertError);
      throw insertError;
    }

    console.log('Property inserted successfully:', insertedProperty);

    // Test property retrieval
    const { data: retrievedProperty, error: retrieveError } = await supabase
      .from('properties')
      .select('*')
      .eq('id', insertedProperty.id)
      .single();

    if (retrieveError) {
      console.error('Property retrieval failed:', retrieveError);
      throw retrieveError;
    }

    console.log('Property retrieved successfully:', retrievedProperty);

    // Test property status update
    const { error: updateError } = await supabase
      .from('properties')
      .update({ status: PropertyStatus.AVAILABLE })
      .eq('id', insertedProperty.id);

    if (updateError) {
      console.error('Property status update failed:', updateError);
      throw updateError;
    }

    console.log('Property status updated successfully');

    // Verify the update
    const { data: verifiedProperty, error: verifyError } = await supabase
      .from('properties')
      .select('*')
      .eq('id', insertedProperty.id)
      .single();

    if (verifyError) {
      console.error('Property verification failed:', verifyError);
      throw verifyError;
    }

    console.log('Property verification successful:', verifiedProperty);
    console.log('All property submission tests passed successfully!');

    return {
      success: true,
      property: verifiedProperty,
    };
  } catch (error) {
    console.error('Property submission test failed:', error);
    return {
      success: false,
      error,
    };
  }
};