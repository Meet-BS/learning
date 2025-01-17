require File.expand_path(File.dirname(__FILE__) + '/neo')

class AboutArrays < Neo::Koan
  def test_creating_arrays
    empty_array = Array.new
    assert_equal Array, empty_array.class
    assert_equal 0, empty_array.size
  end

  def test_array_literals
    array = Array.new
    assert_equal [], array

    array[0] = 1
    assert_equal [1], array

    array[1] = 2
    assert_equal [1, 2], array

    array << 333
    assert_equal [1, 2, 333], array
  end

  def test_accessing_array_elements
    array = [:peanut, :butter, :and, :jelly]

    assert_equal :peanut, array[0]
    assert_equal :peanut, array.first
    assert_equal :jelly, array[3]
    assert_equal :jelly, array.last
    assert_equal :jelly, array[-1]
    assert_equal :butter, array[-3]
  end

  def test_slicing_arrays
    array = [:peanut, :butter, :and, :jelly]

    assert_equal [:peanut], array[0,1]
    assert_equal [:peanut, :butter], array[0,2]
    assert_equal [:and, :jelly], array[2,2]
    assert_equal [:and, :jelly], array[2,20]
    assert_equal [], array[4,0]
    assert_equal [], array[4,100]
    assert_equal nil, array[5,0]
  end

  def test_arrays_and_ranges
    assert_equal Range, (1..5).class                 # Ranges are instances of the Range class.
    assert_not_equal [1, 2, 3, 4, 5], (1..5)         # A Range is not equal to an array; they are different objects.
    assert_equal [1, 2, 3, 4, 5], (1..5).to_a        # Convert the range (1..5) to an array.
    assert_equal [1, 2, 3, 4], (1...5).to_a          # Convert the range (1...5) to an array; excludes the endpoint 5.
  end

  def test_slicing_with_ranges
    array = [:peanut, :butter, :and, :jelly]
  
    assert_equal [:peanut, :butter, :and], array[0..2]   # Includes elements from index 0 to 2 (inclusive).
    assert_equal [:peanut, :butter], array[0...2]        # Includes elements from index 0 to 1 (excludes index 2).
    assert_equal [:and, :jelly], array[2..-1]            # Includes elements from index 2 to the end of the array.
  end  

  def test_pushing_and_popping_arrays
    array = [1, 2]
    array.push(:last)                                   # Appends :last to the array.
  
    assert_equal [1, 2, :last], array                   # The array now includes :last at the end.
  
    popped_value = array.pop                           # Removes and returns the last element (:last).
    assert_equal :last, popped_value                   # The popped value is :last.
    assert_equal [1, 2], array                         # The array no longer includes :last.
  end

  def test_shifting_arrays
    array = [1, 2]
    array.unshift(:first)                              # Prepends :first to the array.
  
    assert_equal [:first, 1, 2], array                 # The array now includes :first at the beginning.
  
    shifted_value = array.shift                        # Removes and returns the first element (:first).
    assert_equal :first, shifted_value                 # The shifted value is :first.
    assert_equal [1, 2], array                         # The array no longer includes :first.
  end


end
